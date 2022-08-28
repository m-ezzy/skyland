let express = require("express");
let router = express.Router();
let db = require('../database.js');

let path = require("path");

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

	let p = {};

	let query = `SELECT chat_id,user_id1,user_id2 FROM chats WHERE user_id1=${user_id} OR user_id2=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });

	console.log(rows);
	console.log('pppppppppppppppppppppppppppppppppppppppppppp');

	for (let i=0 ; i<rows.length ; i++) {
		let r = rows[i];

		//aaa = Object.values(JSON.parse(JSON.stringify(rows)));
		//a[i] = JSON.parse(JSON.stringify(r));

		p[r.chat_id] = {user_id: 0, user_name: '', first_name: '', last_name: '', extension: '', row_up: 0, row_down: 0};

		p[r.chat_id].user_id = (r.user_id1 == user_id) ? r.user_id2 : r.user_id1;

		let query2 = `SELECT user_name,first_name,last_name,extension FROM users WHERE user_id=${p[r.chat_id].user_id}`;
		let rows2 = await db.query(query2).catch(err => { throw err });

		p[r.chat_id].user_name = rows2[0].user_name;
		p[r.chat_id].first_name = rows2[0].first_name;
		p[r.chat_id].last_name = rows2[0].last_name;
		p[r.chat_id].extension = rows2[0].extension;
	}

	let query3 = `SELECT COUNT(*) FROM chat_media`;
	let rows3 = await db.query(query3).catch(err => { throw err });
	let row_num = rows3[0]['COUNT(*)'];

	/*
	Object.keys(p).forEach(ppp => {
		p[ppp].row_up = row_num;
		p[ppp].row_down = row_num;
	});
	*/
	for (let ppp in p) {
		p[ppp].row_up = row_num;
		p[ppp].row_down = row_num;
	}

	res.contentType('text/json');
	res.send(JSON.stringify(p));
	//res.json(p);
});

module.exports = router;
