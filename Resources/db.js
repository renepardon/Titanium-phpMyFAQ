/**
 * Describes a database with the following columns:
 * 
 * ROWID, name, version
 */
var DATABASE_NAME = 'phpMyFAQ';

exports.createDb = function() {
	Ti.Database.install('phpMyFAQ.sqlite', DATABASE_NAME);
};

exports.selectDomains = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('SELECT `ROWID` AS `uid`, * FROM `domains`');
	
	while (rows.isValidRow()) {
		retData.push({uri:rows.fieldByName('uri'), id:rows.fieldByName('uid')});
		rows.next();
	}
	db.close();
	
	return retData;
};

exports.updateDomain = function(_id, _uri, _version) { 
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('UPDATE `domains` SET `uri`=?, `version`=? WHERE `ROWID`=?;', _uri, _version, _id);
	
	var rows = mydb.execute('SELECT * FROM `domains` WHERE `uri`=? AND `version`=?;', _uri, _version);
	mydb.close();
	
	return rows;
};

exports.addDomain = function(_uri, _version) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	
	mydb.execute('INSERT INTO `domains` VALUES (?, ?);', _uri, _version);
	mydb.close();
};

exports.deleteDomain = function(_id) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	
	mydb.execute('DELETE FROM `domains` WHERE `ROWID`=?;', _id);
	mydb.close();
};