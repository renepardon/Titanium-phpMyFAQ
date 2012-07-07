
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

module.exports = phpMyFAQInfo;
