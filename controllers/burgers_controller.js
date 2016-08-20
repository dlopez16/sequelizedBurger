var express = require('express');
var router = express.Router();
var cat = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/burger');
});

router.get('/burgers_db', function (req, res) {
	cat.all(function (data) {
		var hbsObject = { cats: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers_db/create', function (req, res) {
	cat.create(['name', 'sleepy'], [req.body.name, req.body.sleepy], function () {
		res.redirect('/cats');
	});
});

router.put('/burgers_db/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	cat.update({ sleepy: req.body.sleepy }, condition, function () {
		res.redirect('/burgers_db');
	});
});

router.delete('/burgers_db/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	cat.delete(condition, function () {
		res.redirect('/burgers_db');
	});
});

module.exports = router;
