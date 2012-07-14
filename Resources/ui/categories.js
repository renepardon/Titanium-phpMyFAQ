function phpMyFAQCategories(url, callback) {
	//console.log(url);
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
 			if (typeof callback == 'function') {
 				callback(this.responseText);
 			}
		},
		onerror : function(e) {
     		Ti.API.debug(e.error);
     		Ti.API.info("Error: " + Ti.API.debug(e.error));
     		alert(e.error);
 		},
 		timeout : 5000
 	});
 	// Prepare the connection.
 	client.open("GET", url + "api.php?action=getCategories");
 	// Send the request.
 	client.send();
}

function categories (nav, uri, parentID) {
	if (!parentID) {
		parentID = 0;
	}
	
	var window = Ti.UI.createWindow({
		navBarHidden: false,
        modal : false,
        fullscreen: false,
        tabBarHidden: true,
		title: 'Übersicht',
		backgroundColor: '#FFFFFF'
	});
    	
	nav.open(window);
    	
	phpMyFAQCategories(uri, function(categories) {
	//alert(categories);
		var json = JSON.parse(categories);
	    var data = [];
		for (var i = 0; i < json.length; ++i) {
			if (json[i].parent_id == parentID) {
				data.push({title: json[i].name, hasChild: true, id: json[i].id});
			}
		}
		var tableview = Ti.UI.createTableView({data: data, search: Ti.UI.createSearchBar()});
		
		tableview.addEventListener('click', function (event) {
			var cat = require('ui/categories');
			cat(nav, uri, event.row.id);
		});
		
		window.add(tableview);
	});
}


module.exports = categories;
