let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let group_id = req.body.group_id;

	let query = `INSERT INTO group_request_to_join(group_id,user_id) VALUES(${group_id},${user_id})`;
	let rows = await db.query(query).catch(err => { throw err });

	res.contentType('text/json');
	res.send(JSON.stringify({'result': 1}));
});
module.exports = router;
