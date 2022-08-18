let express = require("express");
let router = express.Router();
let con = require('../database.js');

let path = require("path");
let cookieParser = require("cookie-parser");

router.post("/", async (req, res) => {
	let user_name = req.body.user_name;

	let query = `SELECT user_name FROM accounts WHERE user_name='${user_name}'`;
	let rows = await con.query(query).catch(err => { console.log(err); });

	res.contentType('text/json');

	console.log(rows);
	console.log(rows.length);

	console.log(JSON.stringify('result=1'));

	if (rows.length) {
		console.log(JSON.stringify(0));
		res.send(JSON.stringify(0));
	} else {
		res.send(JSON.stringify(1));
	}
});

module.exports = router;
