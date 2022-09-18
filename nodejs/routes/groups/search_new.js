let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let q = req.body.q;

	//let query = `SELECT * FROM groups WHERE group_name LIKE '${q}%' OR title LIKE '${q}%'`;
	let query = `SELECT groups.group_id,groups.group_name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.group_id=group_members.group_id WHERE (groups.group_name LIKE '${q}%' OR groups.title LIKE '${q}%') AND group_members.user_id!=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(rows)));
});
module.exports = router;
