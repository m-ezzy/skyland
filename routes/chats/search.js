let express = require("express");
let router = express.Router();
let con = require('../database.js');

let path = require("path");

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;
	let q = req.params.q;

	let query = `SELECT * FROM accounts WHERE user_name LIKE '${q}%' OR first_name LIKE '${q}%' OR last_name LIKE '${q}%'`;
	let rows = await con.query(query).catch(err => { throw err });

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(rows)));
});

module.exports = router;
