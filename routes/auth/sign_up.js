let express = require("express");
let router = express.Router();
let con = require('../database.js');

let path = require("path");
let cookieParser = require("cookie-parser");

router.post("/", async (req, res) => {
	let user_id;

	let user_name = req.body.user_name;
	let pass_word = req.body.pass_word;

	let first_name = req.body.first_name;
	let last_name = req.body.last_name;

	let query = `INSERT INTO accounts(user_name,pass_word,first_name,last_name) VALUES('${user_name}','${pass_word}','${first_name}','${last_name}')`;
	let rows = await con.query(query).catch(err => { throw err });

	user_id = rows.insertId;
	console.log(user_id);

	query = `INSERT INTO peer_id(user_id) VALUES(${user_id})`;
	rows = await con.query(query).catch(err => { throw err });

	//creating chat between itself
	query = `INSERT INTO chats(user_id1,user_id2) VALUES(${user_id},${user_id})`;
	rows = await con.query(query).catch(err => { throw err });

	res.cookie('user_id', user_id, {maxAge: '10000000'});

	res.redirect('../../index.html');
});

module.exports = router;
