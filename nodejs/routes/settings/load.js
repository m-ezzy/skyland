let express = require("express");
let router = express.Router();
let db = require('../../database');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

	let query = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
	let data = JSON.parse(JSON.stringify(rows[0]));

	res.render("settings", {"data": data}, (err, html) => {
		res.contentType('text/json');
		res.send({"json": data, "html": html});
	});
});
module.exports = router;
