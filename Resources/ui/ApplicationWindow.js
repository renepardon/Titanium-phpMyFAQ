// Application Window Component Constructor
function ApplicationWindow() {
    
	var main = Ti.UI.createWindow({
        //backgroundImage : '/images/background.png',
		backgroundColor: '#FFF',
        navBarHidden : false, // iOS only
        modal : false,
        fullscreen: false,
        tabBarHidden: true,
        exitOnClose : true  // Android only
   });
   main.open();
   
    // Create our main window
    var self = Ti.UI.createWindow({
        navBarHidden : false, // iOS only
        modal : false,
        fullscreen: false,
        tabBarHidden: true,
        title: 'phpMyFAQ',
        exitOnClose : true  // Android only
    });
    
  	var nav = Titanium.UI.iPhone.createNavigationGroup({window: self});
    var rightButton = Ti.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.ADD});
    var leftButton = Ti.UI.createButton({systemButton: Ti.UI.iPhone.SystemButton.SEARCH});
    rightButton.addEventListener('click', function () {
    	var addMe = require('ui/add');
    	addMe(nav);
    });
    
    leftButton.addEventListener('click',function() {
		alert('Funktionalität folgt');
    });
    
    self.rightNavButton = rightButton;
    self.leftNavButton = leftButton;
	main.add(nav);	

	// Anzeigen der gespeicherten Uris
	var showUris = require('ui/show_uris');
	showUris(self, nav);

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
