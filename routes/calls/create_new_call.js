let express = require("express");
let router = express.Router();
let con = require('../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let ui2 = req.body.user_id;
	let ci = req.body.chat_id;
	let t = req.body.type;

	let query = `INSERT INTO calls_chats(chat_id,called_by,type) VALUES('${ci}',${ui2},${t})`;
	let rows = await con.query(query).catch(err => { throw err });

	query = `SELECT peer_id FROM peer_id WHERE user_id=${ui2}`;
	rows = await con.query(query).catch(err => { throw err });

	res.contentType('text/json');
    res.send(JSON.stringify(rows[0]));
});

module.exports = router;
