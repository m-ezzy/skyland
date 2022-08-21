let express = require("express");
let router = express.Router();
let con = require('../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let chat_id = req.body.chat_id;
	let message = req.body.message;

	let query = `INSERT INTO chat_media(chat_id,sender_id,media_type,text) VALUES (${chat_id},${user_id},0,'${message}')`;
	let rows = await con.query(query).catch(err => { throw err });

	res.contentType('text/json');
	res.send(JSON.stringify(rows.insertId));
});

module.exports = router;
