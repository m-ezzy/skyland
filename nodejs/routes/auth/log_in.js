/*
import db from '../database.js';

import path from "path";
import cookieParser from "cookie-parser";

import { Router } from "express";
let router = Router();
*/

let db = require('../../database.js');
let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
	res.redirect('/page_not_found');
});

router.post("/", async (req, res) => {
	const user_name = req.body.user_name;
	const pass_word = req.body.pass_word;

	let query = `SELECT user_id,user_name,pass_word FROM users WHERE user_name='${user_name}' AND pass_word='${pass_word}'`;
	let rows = await db.query(query).catch(err => { console.log(err); });
	console.log(JSON.stringify(rows));

	if (rows) {
		res.cookie('user_id', rows[0].user_id, {maxAge: '3600000'}); //1 hour

		//res.contentType('text/html');
		res.redirect('../../index.html');
	} else {
		let query = `SELECT * FROM users WHERE user_name='${user_name}'`;
		rows = await db.query(query).catch(err => { console.log(err); });

		if ( rows.length == 0 ) {
			res.send(`user name ${user_name} is incorrect !`);
		} else {
			res.send(`pass word ${pass_word} is incorrect !`);
		}
	}
});
//export default router;
module.exports = router;
