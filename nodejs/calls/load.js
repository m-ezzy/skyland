let express = require("express");
let router = express.Router();
let db = require('../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

	let query = `SELECT * FROM calls_chats WHERE chat_id in (SELECT chat_id FROM chats WHERE user_id1=${user_id} OR user_id2=${user_id})`;
	let rows = await db.query(query).catch(err => { throw err });

	res.contentType('json');
	res.json(JSON.parse(JSON.stringify(rows)));

	/*
	let a = [];
	for (let i = 0 ; i < rows.length ; i++) {
		a[i] = {chat_id: 0, called_by: 0, called_at: '', type: 0, length: 0};

		a[i].chat_id = rows[i].chat_id;
		a[i].called_by = rows[i].called_by;
		a[i].called_at = rows[i].called_at;
		a[i].type = rows[i].type;
		a[i].length = rows[i].length;
	}

	//res.json(rows);
	res.contentType('json');
    res.send(JSON.stringify(a));
	*/
});

module.exports = router;
