let express = require("express");
let router = express.Router();
let db = require('../../database.js');
let config = require('../../config.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let chat_id = req.body.chat_id;
	let row_up = req.body.row_up;

	//let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id>${row_up} LIMIT ${limit}`;
	let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id<=${row_up}`;
	let rows = await db.query(query).catch(err => { throw err });
	console.log(rows.length);

	let limit = config.limit;
	if (rows.length < limit) {
		limit = rows.length;
	}
	console.log(limit);

	res.contentType('text/json');
	res.send(JSON.stringify(rows.splice(rows.length - limit, limit)));
});
module.exports = router;
