// Application Window Component Constructor, platform specific features
function ApplicationWindowPlatform(/*TiUIWindow*/self, /*TiUIView*/webView, /*boolean*/titleBarOn, /*boolean*/drawerOn) {

     if (titleBarOn) {
        /* When the webview loads, set the title
        webView.addEventListener('load', function(e) {
            self.title = webView.evalJS('document.title');
        });
*/
    }
    
    self.add(Ti.UI.createTableView({data: [ {title: 'Kategorie1'}, {title: 'Kategorie2'}    ]}));

    if (drawerOn) {
        // Put a back/forward button into a drawer at the bottom of the screen that can be
        // opened when needed. 
        var Drawer = require('/ui/Drawer');
        var drawer = new Drawer(self);
        var backButton = Ti.UI.createButton({ 
            backgroundImage: '/images/LeftArrow.png' ,
            width: 48,
            height: 48
        });
        backButton.addEventListener('click', function (e) {
            webView.goBack();
        });
        drawer.buttonBar.add(backButton);
        var forwardButton = Ti.UI.createButton({ 
            backgroundImage: '/images/RightArrow.png' ,
            width: 48,
            height: 48
        });
        forwardButton.addEventListener('click', function (e) {
            webView.goForward();
        });
        drawer.buttonBar.add(forwardButton);    
        
        var infoButton = Ti.UI.createButton({
        	backgroundImage: '/images/InfoButton.png',
        	width: 48,
        	height: 48
        }); 
        infoButton.addEventListener('click', function(e) {
        	//alert('test');
			phpMyFAQInfo("http://www.phpmyfaq.de/faq/api.php?action=getVersion");
        });
        drawer.buttonBar.add(infoButton);
        
        self.add(drawer.view);
    }
}



function phpMyFAQInfo(url) {
	console.log(url);
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			//Ti.API.info("Received text: " + this.responseText);
	 		var json = JSON.parse(this.responseText);
 			alert("Installierte Version: " + json.version);
		},
		onerror : function(e) {
     		Ti.API.debug(e.error);
     		Ti.API.info("Error: " + Ti.API.debug(e.error));
     		alert(e.error);
 		},
 		timeout : 5000
 	});
 	// Prepare the connection.
 	client.open("GET", url);
 	// Send the request.
 	client.send();
}


module.exports = ApplicationWindowPlatform;
