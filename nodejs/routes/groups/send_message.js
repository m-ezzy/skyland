let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let group_id = req.body.group_id;
	let message = req.body.message;

	let query = `INSERT INTO group_media(group_id,sender_id,media_type,text) VALUES(${group_id},${user_id},0,'${message}')`;
	let rows = await db.query(query).catch(err => { throw err });
	console.log(rows);
	
	res.contentType('text/json');
	res.send(JSON.stringify({'group_media_id': rows.insertId}));
});
module.exports = router;
