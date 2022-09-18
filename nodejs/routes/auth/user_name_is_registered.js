let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_name = req.body.user_name;

	let query = `SELECT user_name FROM users WHERE user_name='${user_name}'`;
	let rows = await db.query(query).catch(err => { console.log(err); });

	// type of content before it was sent as a string
	res.contentType('text/json');

	console.log(rows);

	if (rows.length) {
		res.send(JSON.stringify(1));
	} else {
		res.send(JSON.stringify(0));
	}
});
module.exports = router;
