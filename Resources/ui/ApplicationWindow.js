// Application Window Component Constructor
function ApplicationWindow() {
    
    // If you don't want margins around the Translucent or Web View you can set the gutter to zero.
    var gutter = Ti.Platform.displayCaps.platformWidth * 0.025;
    // The translucent view is a stylish rounded rect behind the web view.
    var translucentViewOn = true;
    // If you want the translucent view or the web view to fade in slowly, set this to true.
    var animationsOn = true;
    // If you don't want a navBar with the corresponding back button you can set this to false.
    // If so, this requires you to have a back button in your HTML on iOS. Android uses standard hardware back button.
    var titleBarOn = true;
    // Set the background color appropriately.
    var backgroundColor = '#e3e3e3';
    // Popup menu/drawer for forward/back. Without this cross-file links will have no way of getting back to the 
    // calling file without a UI in the HTML proper.
    var drawerOn = false;

    var osname = Ti.Platform.osname;

var main = Ti.UI.createWindow({
        // If no image desired, you can remove this line and set the backgroundColor instead.
        //backgroundImage : '/images/background.png',
		backgroundColor: '#ABABAB',
        navBarHidden : !titleBarOn, // iOS only
 //       barColor : barColor,
        modal : false,
        fullscreen: false,
        tabBarHidden: true,
        title: 'phpMyFAQ',
        exitOnClose : true  // Android only
   });
   main.open();
   
   
    // Create our main window
    var self = Ti.UI.createWindow({
        // If no image desired, you can remove this line and set the backgroundColor instead.
        navBarHidden : !titleBarOn, // iOS only
 //       barColor : barColor,
        modal : false,
        fullscreen: false,
        tabBarHidden: true,
        title: 'phpMyFAQ',
        exitOnClose : true  // Android only
    });
    
    
var nav = Titanium.UI.iPhone.createNavigationGroup({window: self});
    main.add(nav);
    
    
    var rightButton = Ti.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.ADD});
    var leftButton = Ti.UI.createButton({systemButton: Ti.UI.iPhone.SystemButton.SEARCH});
    rightButton.addEventListener('click', function () {
    	var addMe = require('ui/add');
    	addMe(nav);
    });
    
    leftButton.addEventListener('click',function() {

    });
    
    self.rightNavButton = rightButton;
    self.leftNavButton = leftButton;

    if (translucentViewOn) {
        // Nice translucent rounded rect in the background.
        var translucentView = Ti.UI.createView({
            left : gutter,
            top : gutter,
            right : gutter,
            bottom : gutter,
            borderRadius : 5,
            borderWidth : 1,
            borderColor : backgroundColor,
            backgroundColor : backgroundColor,
            opacity : animationsOn ? 0 : 0.75
        });
        self.add(translucentView);

       if (animationsOn) {
            setTimeout(function() {
                translucentView.animate(Ti.UI.createAnimation({
                    opacity : 0.75,
                    duration : 2000
                }));
            }, 1);
        }
        gutter = gutter * 2;
    }

    // Load the platform specific UI.
    var ApplicationWindowPlatform;
    if (Ti.Platform.osname == 'mobileweb') {
        // Work around missing platform-specific require feature in Mobile Web.
        ApplicationWindowPlatform = require('mobileweb/ui/ApplicationWindowPlatform');
    } else {
        ApplicationWindowPlatform = require('ui/ApplicationWindowPlatform'); // hier geht's ins iPhone
    }
    ApplicationWindowPlatform(self, false, titleBarOn, drawerOn);
    

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
