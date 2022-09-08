let express = require("express");
let router = express.Router();
let db = require('../../database.js');
let path = require("path");

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

	let query = `SELECT groups.group_id,groups.group_name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.group_id=group_members.group_id WHERE group_members.user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });

	let query2 = `SELECT COUNT(*) FROM group_media`;
	let rows2 = await db.query(query2).catch(err => { throw err });
	let row_num = rows2[0]['COUNT(*)'];

	let p = {};
	for (let i = 0 ; i < rows.length ; i++) {
	//rows.forEach(async (r) => {
		let r = rows[i];

		p[r.group_id] = {group_name: r.group_name, title: r.title, extension: r.extension, row_up: row_num, row_down: row_num, members: {}};

		let query3 = `SELECT users.user_id,users.user_name,users.first_name,users.last_name,users.extension FROM users INNER JOIN group_members ON users.user_id=group_members.user_id WHERE group_members.group_id=${r.group_id}`;
		let rows3 = await db.query(query3).catch(err => { throw err });

		rows3.forEach(m => {
			p[r.group_id]['members'][m.user_id] = {user_name: m.user_name, first_name: m.first_name, last_name: m.last_name, extension: m.extension};
		});
	}

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(p)));
});
module.exports = router;
