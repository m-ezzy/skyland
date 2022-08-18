let express = require("express");
let router = express.Router();
let con = require('../database.js');

let path = require("path");
let cookieParser = require("cookie-parser");

router.post("/", async (req, res) => {
	const user_name = req.body.user_name;
	const pass_word = req.body.pass_word;

	let query = `SELECT user_id,user_name,pass_word FROM accounts WHERE user_name='${user_name}' AND pass_word='${pass_word}'`;
	let rows = await con.query(query).catch(err => { console.log(err); });

	console.log(rows);
	console.log(JSON.stringify(rows));
	console.log(rows[0]);
	console.log(rows[0].user_id);
	console.log(rows[0].user_name);

	if (rows) {
		res.cookie('user_id', rows[0].user_id, {maxAge: '10000000'});

		//res.contentType('text/html');
		res.redirect('../../index.html');
	} else {
		let query = `SELECT * FROM accounts WHERE user_name='${user_name}'`;
		rows = await con.query(query).catch(err => { console.log(err); });

		if ( rows.length == 0 ) {
			res.send("user name $user_name is incorrect !");
		} else {
			res.send("pass word $pass_word is incorrect !");
		}
	}
});

module.exports = router;
