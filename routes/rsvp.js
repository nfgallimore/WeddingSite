var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
	req.db.collection('Guests').find().toArray(function(err, docs) {
		console.log(docs);
		res.render('rsvp', { title: 'RSVP', guests: docs });
	});
});

module.exports = router;