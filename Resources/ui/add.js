function add (nav) {
	var window = Ti.UI.createWindow({
		navBarHidden: false,
        modal : false,
        fullscreen: false,
        tabBarHidden: true,
		title: 'Anlegen',
		backgroundColor: '#FFFFFF'
	});
    	
	nav.open(window);
    	
    	//var version = require('network/version');
    	//version("http://www.phpmyfaq.de/faq/api.php?action=getVersion");
    	
    	var view = Ti.UI.createView({layout: 'vertical'});
    	
    	var inputLabel = Ti.UI.createLabel({
    		text: 'phpMyFAQ-Installation',
    		font: {fontSize: 18},
			shadowColor: '#aaa',
			shadowOffset: {x:1, y:1},
			top: 5, left: 15
    	});
    	view.add(inputLabel);
    	
    	var feldURL = Ti.UI.createTextField({
    		keyboardType: Ti.UI.KEYBOARD_URL,
    		hintText: 'http://www.test.de/',
    		value: '',
    		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    		top: 10,
    		left: 15,
    		right: 15
    	});
    	view.add(feldURL);
    	
    	var feldLabel = Ti.UI.createLabel({
    		text: 'Geben Sie hier den URL zu Ihrer phpMyFAQ-Installation ein. Die Daten werden inklusive der installierten Version gespeichert.',
    		color: '#ABABAB',
    		font: { fontSize:12 },
    		left: 15, right: 15, top: 5
    	});
    	view.add(feldLabel);
    	
    	var button = Ti.UI.createButton({
    		title: 'Eintragen',
    		left: 15,
    		right: 15,
    		top: 10,
    		borderRadius: 0,
    		borderColor: 'black',
    		borderWidth: 2,
    		backgroundColor: 'blue'
    	})
    	
    	button.addEventListener('click', function(){
    		var phpMyFAQInfo = require('network/version');
    		var version = phpMyFAQInfo(feldURL.getValue());
    		//alert(feldURL.getValue());
    	})
    	
    	view.add(button);
    	window.add(view);
}


module.exports = add;
