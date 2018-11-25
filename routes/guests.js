var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");

router.get('/', function(req, res, next) {
	db.collection('guests').find({}).toArray(function(err, docs) {
		if (err) {
			handleError(res, err.message, "Failed to get guests.");
		} 
		else {
			res.status(200).json(docs);
		}
	});
	res.render('rsvp', { title: 'RSVP'});
});
