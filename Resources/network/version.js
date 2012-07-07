
function phpMyFAQInfo(url) {
	//console.log(url);
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			//Ti.API.info("Received text: " + this.responseText);
	 		var json = JSON.parse(this.responseText);
	 		var db = require('db');
	 		db.createDb();
	 		db.addDomain(url, json.version);
 			Ti.UI.createAlertDialog({title: 'Speicherung', message: "Installierte Version: " + json.version + "\nGespeichert."}).show();
		},
		onerror : function(e) {
     		Ti.API.debug(e.error);
     		Ti.API.info("Error: " + Ti.API.debug(e.error));
     		alert(e.error);
 		},
 		timeout : 5000
 	});
 	// Prepare the connection.
 	client.open("GET", url + "api.php?action=getVersion");
 	// Send the request.
 	client.send();
}

module.exports = phpMyFAQInfo;
