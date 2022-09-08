let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let group_id = req.body.group_id;
	let member = req.body.member;

	let query = `INSERT INTO group_members(group_id,user_id) VALUES(${group_id},${member})`;
	let rows = await db.query(query).catch(err => { throw err });

	res.contentType('text/json');
	res.send(JSON.stringify({'result': 1}));
});
module.exports = router;
