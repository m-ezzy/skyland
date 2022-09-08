let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

    let query = `UPDATE connection_ids SET peer_id='${req.body.peer_id}' WHERE user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });

    res.send('1');
});

module.exports = router;
