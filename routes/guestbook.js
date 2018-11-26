var express = require("express");
var router = express.Router();
var db = require("../db");

router.get("/", function(req, res, next) {
	req.db.collection("Posts").find().toArray(function(err, docs) {
		res.render("guestbook", { title: "Guestbook", posts: docs });
	});
});

router.post("/", function(req, res, next) {
	var newValue =
	{
		"name" : req.body.name,
		"note" : req.body.note
	};

	req.db.collection("Posts").insert(newValue, function(err, res) {
		if (err) throw err;
		console.log(req.body.name + " post was inserted.");
	});

	req.db.collection("Posts").find().toArray(function(err, docs) {
		res.render("guestbook", { title: "Guestbook", posts: docs });
	});
});

module.exports = router;