let express = require("express");
let router = express.Router();
let db = require('../../database');
let model = require('../../models/chats');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let p = {};

	let query = `SELECT chat_id,user_id1,user_id2 FROM chats WHERE user_id1=${user_id} OR user_id2=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });

	let query3 = `SELECT COUNT(*) FROM chat_media`;
	let rows3 = await db.query(query3).catch(err => { throw err });
	let row_num = rows3[0]['COUNT(*)'];

	for (let i = 0 ; i < rows.length ; i++) {
	//await rows.forEach(async (r) => {
		let r = rows[i];

		p[r.chat_id] = {user_id: 0, user_name: '', first_name: '', last_name: '', extension: '', row_up: row_num, row_down: row_num};
		p[r.chat_id].user_id = (r.user_id1 == user_id) ? r.user_id2 : r.user_id1;

		let query2 = `SELECT user_name,first_name,last_name,extension FROM users WHERE user_id=${p[r.chat_id].user_id}`;
		let rows2 = await db.query(query2).catch(err => { throw err });

		p[r.chat_id].user_name = rows2[0].user_name;
		p[r.chat_id].first_name = rows2[0].first_name;
		p[r.chat_id].last_name = rows2[0].last_name;
		p[r.chat_id].extension = rows2[0].extension;
	}
	/*
	res.contentType('text/json');
	res.send(JSON.stringify(p));
	//res.json(p);
	*/
	res.render('chats', {data: p}, (err, html) => {
		res.contentType('text/json');
		res.send({"data": p, "html": html});
	});
});
module.exports = router;
