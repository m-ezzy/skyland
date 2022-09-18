let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let q = req.body.q;

	let query = `SELECT * FROM users WHERE user_name LIKE '${q}%' OR first_name LIKE '${q}%' OR last_name LIKE '${q}%'`;
	let rows = await db.query(query).catch(err => { throw err });

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(rows)));
});
module.exports = router;
