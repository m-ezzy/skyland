//let path = require("path");
let express = require("express");
let router = express.Router();
let con = require('../database');

router.post("/", (req, res) => {
	//console.log(req);
	//console.log(req.body);

	let user_id = req.cookies.user_id;
	console.log(req.cookies.user_id);

	let query = `SELECT user_id,user_name,first_name,last_name,extension FROM accounts WHERE user_id=${user_id}`;
	con.query(query, function (err, rows) {
		console.log(rows);

		res.contentType('text/json');
		res.type('json');
		res.send(rows[0]);
	});
});

module.exports = router;
