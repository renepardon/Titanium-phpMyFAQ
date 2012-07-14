function main(window, nav) {

	var db = require('db');
    db.createDb();
    var rows = db.selectDomains();
    
    
    var data = [];
    for (var i = 0; i < rows.length; ++i) {
		
		// Row anlegen
    	var row = Ti.UI.createTableViewRow({
    		height: 40
    	});
    	
    	// .id (Löschen) & .uri für den Löschvorgang & Alert-Dialog.
    	row.id = rows[i].id;
    	row.uri = rows[i].uri;

    	var title = Ti.UI.createLabel({
    		left: 2,
    		font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
    		text: rows[i].uri
    	});

    	row.add(title);
    	data.push(row);
		
    	//data.push({title: rows[i].uri, id: rows[i].id});
    }
    
    var tableview = Ti.UI.createTableView({
    	data: data,
    	editable: true,
    	deleteButtonTitle: 'Löschen'
	});	
	
	// Click (uri)
    tableview.addEventListener('click',function(event) {
    	var AddMeAgain = require('ui/categories');
    	AddMeAgain(nav, event.row.uri);
    });
    // Swipe (uri)
	tableview.addEventListener('delete', function (event) {
		var db = require('db');
 		db.createDb();
 		db.deleteDomain(event.row.id);
 		Ti.UI.createAlertDialog({title: 'Hinweis', message: 'Der Eintrag\n' + event.row.uri + '\nwurde gelöscht.'}).show();
 	});

    window.add(tableview);
}
module.exports = main;