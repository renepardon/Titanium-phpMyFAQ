
function phpMyFAQInfo(url) {

	// url testen
	var _hasHttp = new RegExp('^http://', 'im');
	if (!_hasHttp.test(url)) {
		url = 'http://' + url;
	}
	if (url.substr(-1) !== '/') {
		url += '/';
	}

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
	 		var json = JSON.parse(this.responseText);
	 		var db = require('db');
	 		if (json.version) {
		 		db.createDb();
		 		db.addDomain(url, json.version);
	 			Ti.UI.createAlertDialog({title: 'Speicherung', message: "Installierte Version: " + json.version + "\nGespeichert."}).show();
	 		} else {
	     		Ti.UI.createAlertDialog({title: 'Fehler', message: 'Es konnte keine phpMyFAQ-Version gefunden werden!'}).show();
	 		}
		},
		onerror : function(e) {
     		//Ti.API.debug(e.error);
     		//Ti.API.info("Error: " + Ti.API.debug(e.error));
     		//alert(e.error);
     		Ti.UI.createAlertDialog({title: 'Fehler', message: 'Es konnte keine phpMyFAQ-Version gefunden werden!'}).show();
 		},
 		timeout : 5000
 	});
 	// Prepare the connection.
 	client.open("GET", url + "api.php?action=getVersion");
 	// Send the request.
 	client.send();
}

module.exports = phpMyFAQInfo;
