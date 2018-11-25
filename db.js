var MongoClient = require('mongodb').MongoClient;

var URL = "mongodb://heroku_468pgkzw:rorm346755r9ib2n7t7ls9ej7c@ds055525.mlab.com:55525/heroku_468pgkzw";

var _db;

module.exports = {
	
	connectToServer: function( callback ) {
		MongoClient.connect(URL, function( err, db ) {
			_db = db;
			return callback( err );
		});
	},

	getDb: function() {
		return _db;
	}
};
