let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let chat_id = req.body.chat_id;
	let encrypted_message = req.body.encrypted_message;

	let query = `INSERT INTO chat_media(chat_id,sender_id,media_type,text) VALUES (${chat_id},${user_id},0,'${encrypted_message}')`;
	let rows = await db.query(query).catch(err => { throw err });

	res.contentType("text/json");
	res.send(JSON.stringify({"chat_media_id": rows.insertId}));
});
module.exports = router;
