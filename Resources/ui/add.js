
function render() {
	
}

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
    	
    	
    	var feldURL = Ti.UI.createTextField({
    		keyboardType: Ti.UI.KEYBOARD_URL,
    		hintText: 'http://www.test.de',
    		value: '',
    		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    		top: 10,
    		left: 15,
    		right: 15
    	});
    	view.add(feldURL);
    	
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
    		alert(feldURL.getValue());
    	})
    	
    	view.add(button);
    	window.add(view);
    	
    	alert(feldURL.getValue());
}


module.exports = add;
