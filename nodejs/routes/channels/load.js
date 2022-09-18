let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

	let query = `SELECT channels.channel_id,channels.channel_name,channels.title,channels.extension FROM channels INNER JOIN channel_members ON channels.channel_id=channel_members.channel_id WHERE channel_members.user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });

	let query2 = `SELECT COUNT(*) FROM channel_media`;
	let rows2 = await db.query(query2).catch(err => { throw err });
	let row_num = rows2[0]['COUNT(*)'];

	let p = {};
	for (let i = 0 ; i < rows.length ; i++) {
	//rows.forEach(async (r) => {
		let r = rows[i];

		p[r.channel_id] = {channel_name: r.channel_name, title: r.title, extension: r.extension, row_up: row_num, row_down: row_num, members: {}};

		let query3 = `SELECT users.user_id,users.user_name,users.first_name,users.last_name,users.extension,channel_members.member_type FROM users INNER JOIN channel_members ON users.user_id=channel_members.user_id WHERE channel_members.channel_id=${r.channel_id}`;
		let rows3 = await db.query(query3).catch(err => { throw err });

		rows3.forEach(m => {
			p[r.channel_id]["members"][m.user_id] = {"user_name": m.user_name, "first_name": m.first_name, "last_name": m.last_name, "extension": m.extension, "member_type": m.member_type};
		});
	}

	res.render('channels', {"data": p}, (err, html) => {
		res.contentType('text/json');
		res.send({"json": p, "html": html});
	});
});
module.exports = router;
