let express = require("express");
let router = express.Router();
let db = require('../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let user_id2 = req.body.user_id2;

	let query = `INSERT INTO chats(user_id1,user_id2) VALUES('${user_id}','${user_id2}')`;
	let rows = await db.query(query).catch(err => { throw err });

	//mkdir(`../../../data/chats/chat_id_${chat_id}`);

	res.contentType('text/json');
	res.send(JSON.stringify({'chat_id': rows.insertId, 'row_down': 10}));
});

module.exports = router;
