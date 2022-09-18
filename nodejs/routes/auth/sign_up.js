let db = require('../../database.js');
let express = require("express");
let router = express.Router();

router.post("/", async (req, res) => {
	let user_id;

	let user_name = req.body.user_name;
	let pass_word = req.body.pass_word;
	let first_name = req.body.first_name;
	let last_name = req.body.last_name;

	let query = `INSERT INTO users(user_name,pass_word,first_name,last_name) VALUES('${user_name}','${pass_word}','${first_name}','${last_name}')`;
	let rows = await db.query(query).catch(err => { throw err });

	user_id = rows.insertId;
	console.log(user_id);

	query = `INSERT INTO connection_ids(user_id) VALUES(${user_id})`;
	rows = await db.query(query).catch(err => { throw err });

	//creating chat between itself
	query = `INSERT INTO chats(user_id1,user_id2) VALUES(${user_id},${user_id})`;
	rows = await db.query(query).catch(err => { throw err });

	res.cookie('user_id', user_id, {maxAge: '3600000'});
	res.redirect('../../index.html');
});

module.exports = router;
