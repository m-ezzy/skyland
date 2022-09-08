let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let query = `INSERT INTO calls_chats(chat_id,caller_id,call_type) VALUES('${req.body.chat_id}',${req.cookies.user_id},${req.body.type})`;
	let rows = await db.query(query).catch(err => { throw err });

	let query2 = `SELECT peer_id FROM connection_ids WHERE user_id=${req.body.user_id}`;
	let rows2 = await db.query(query2).catch(err => { throw err });

	res.contentType('text/json');
    res.send(JSON.stringify(rows2[0]));
});

module.exports = router;
