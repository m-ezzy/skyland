let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let group_name = req.body.group_name;

	let query = `INSERT INTO groups(group_name,creator_id) VALUES('${group_name}','${user_id}')`;
	let rows = await db.query(query).catch(err => { throw err });

	let group_id = rows.insertId;

	let query2 = `INSERT INTO group_members(group_id,user_id) VALUES('${group_id}','${user_id}')`;
	let rows2 = await db.query(query2).catch(err => { throw err });

	let query3 = `SELECT COUNT(*) FROM group_media`;
	let rows3 = await db.query(query3).catch(err => { throw err });
	let row_num = rows3[0]['COUNT(*)'];

	console.log(rows, rows2, rows3);

	let value = {
		'group_name': group_name, 
		'title': null, 
		'extension': null, 
		'row_up': 0, 
		'row_down': row_num, 
		'members': {
			user_id: {}
		}
	};
	res.contentType('text/json');
	res.send(JSON.stringify({'group_id': group_id, 'value': value}));
});
module.exports = router;
