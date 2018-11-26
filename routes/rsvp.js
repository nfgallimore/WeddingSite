var express = require("express");
var router = express.Router();
var db = require("../db");

router.get("/", function(req, res, next) {
	req.db.collection("Guests").find().toArray(function(err, docs) {
		res.render("rsvp", { title: "RSVP", guests: docs });
	});
});

router.post("/", function(req, res, next) {
	var query = { "name" : req.body.name };
	var newValue = { $set: 
		{
			"attending" : req.body.attending 
		}
	};

	req.db.collection("Guests").updateOne(query, newValue, function(err, res) {
		if (err) throw err;
		console.log(req.body.name + " status updated.");
	});

	req.db.collection("Guests").find().toArray(function(err, docs) {
		res.render("rsvp", { title: "RSVPD!", guests: docs });
	});
});

module.exports = router;