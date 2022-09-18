let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

	let query = `SELECT * FROM calls_chats WHERE chat_id in (SELECT chat_id FROM chats WHERE user_id1=${user_id} OR user_id2=${user_id})`;
	let rows = await db.query(query).catch(err => { throw err });
	let data = JSON.parse(JSON.stringify(rows));

	res.render("calls", {"data": data}, (err, html) => {
		res.contentType("text/json");
		res.send({"json": data, "html": html});
	});
});
module.exports = router;
