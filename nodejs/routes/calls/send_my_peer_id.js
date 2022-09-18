let express = require("express");
let router = express.Router();
let db = require('../../database.js');

router.post("/", async (req, res) => {
    let query = `UPDATE connection_ids SET peer_id='${req.body.peer_id}' WHERE user_id=${req.cookies.user_id}`;
	let rows = await db.query(query).catch(err => { throw err });

    res.type("json");
    res.send({"successful": 1});
});
module.exports = router;
