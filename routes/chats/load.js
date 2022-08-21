let express = require("express");
let router = express.Router();
let con = require('../database.js');

let path = require("path");

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

	let a = [];

	let query = `SELECT chat_id,user_id1,user_id2 FROM chats WHERE user_id1=${user_id} OR user_id2=${user_id}`;
	let rows = await con.query(query).catch(err => { throw err });

	console.log(rows);

	for (let i = 0 ; i < rows.length ; i++) {
		let r = rows[i];

		//aaa = Object.values(JSON.parse(JSON.stringify(rows)));
		//a[i] = JSON.parse(JSON.stringify(r));

		a[i] = {chat_id: 0, user_id: 0, user_name: '', first_name: '', last_name: '', extension: '', row_up: 0, row_down: 0};

		a[i].chat_id = r.chat_id;
		a[i].user_id = (r.user_id1 == user_id) ? r.user_id2 : r.user_id1;

		let query2 = `SELECT user_name,first_name,last_name,extension FROM accounts WHERE user_id=${a[i]['user_id']}`;
		let rows2 = await con.query(query2).catch(err => { throw err });

		a[i].user_name = rows2[0].user_name;
		a[i].first_name = rows2[0].first_name;
		a[i].last_name = rows2[0].last_name;
		a[i].extension = rows2[0].extension;
	}

	let query3 = `SELECT COUNT(*) FROM chat_media`;
	let rows3 = await con.query(query3).catch(err => { throw err });
	let row_num = rows3[0]['COUNT(*)'];

	for (let i = 0 ; i < a.length ; i++) {
		a[i].row_up = row_num;
		a[i].row_down = row_num;
	}

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(a)));
});

module.exports = router;
