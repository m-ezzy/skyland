let express = require("express");
let router = express.Router();
let db = require('../database');

const multer = require('multer');
const path = require('path');
const fs = require("fs");

const upload = multer({
	dest: './data/icons/users/temp'
});

router.post("/", upload.single('file_pp'), async (req, res) => {
	let user_id = req.cookies.user_id;
	console.log(req.file_pp);
	console.log(req.file);
	console.log(req.files);
	let image = req.file;

	//console.log(req, req.file, req.file_pp);
	let temp_path = req.file.path;
	let target_path = `./data/icons/users/${user_id}${path.extname(req.file.originalname).toLowerCase()}`;

	fs.renameSync(temp_path, target_path, (err) => {
		console.log(err);
	});

	/*res.contentType('text/json');*//*
	fs.readFileSync(`../../../data/icons/users/${user_id}.png`, {encoding: 'base64'}, (err2, content) => {
		console.log(err2, content);
		res.contentType('image/png');
		res.end(content);
	});
	*/
	res.contentType('png');
	res.send(req.file);
	//res.sendFile(`./data/icons/users/${user_id}.png`, {root: path.join(__dirname, '../../../')});
});
module.exports = router;
