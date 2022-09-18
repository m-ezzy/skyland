let express = require("express");
let router = express.Router();
let fs = require('fs');

let path = require('path');
let url = require("url");

let db = require('../database');

router.get("/:user_id2", async (req, res) => {
	let user_id = req.cookies.user_id;

	//let url_parsed = url.parse(req.url);
	let user_id2 = req.params.user_id2.split('.');

	//console.log(url_parsed);

	//let query = "SELECT * from chats WHERE user_id1=";

	let image_path = path.join(__dirname, `../../data/icons/users/${user_id2[0]}.jpg`);

	fs.readFileSync(image_path, (err, content) => {
		res.contentType('image/jpg');
		res.end(content);
	})
});
module.exports = router;
