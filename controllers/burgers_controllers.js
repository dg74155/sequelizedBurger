var express = require("express");
var router = express.Router();

var models = require("../models");

router.get("/", function(req, res) {
	models.burgers.findAll({}).then(function(data) {
		var hdbObject = {
			burger: data
		};
		res.render("index", hdbObject);
	});
});

router.post("/", function(req, res){
	models.burgers.create({burger_name: req.body.b_name, devoured: req.body.devoured}).then(function(data) {
		res.redirect("/")
	});
});

router.put("/:id", function(req, res){
	var condition = "id = " + req.params.id;

	console.log("condition", condition);

	models.burgers.update({ devoured: req.body.devoured }, {where: {id:req.params.id}}).then(function () {
		res.redirect("/");
	});
});

router.delete('/:id', function (req, res) {

	models.burgers.destroy({where: {id:req.params.id}}).then(function() {
		res.redirect('/burgers');
	});
});

module.exports = router;