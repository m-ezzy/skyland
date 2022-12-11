let users = require("../models/users");

exports.log_in = async (req, res) => {
	let user_id = await users.selectUserLogIn(req.body.user_name, req.body.pass_word);

	if (user_id) {
		res.cookie('user_id', user_id, {maxAge: '360000000'}); //1 hour
		//res.contentType('text/html');
		res.redirect('../../index.html');
	} else {
		res.send(`user name ${user_name} or pass word ${pass_word} is incorrect !`);
		/*
		let query = `SELECT * FROM users WHERE user_name='${user_name}'`;
		rows = await db.query(query).catch(err => { console.log(err); });
		if ( rows.length == 0 ) {
			res.send(`user name ${user_name} is incorrect !`);
		} else {
			res.send(`pass word ${pass_word} is incorrect !`);
		}
		*/
	}
}
exports.sign_up = async (req, res) => {
	let user_id = await users.insertNew(req.body.user_name, req.body.pass_word, req.body.first_name, req.body.last_name);
	console.log(user_id);

	let query = `INSERT INTO connection_ids(user_id) VALUES(${user_id})`;
	let rows = await db.query(query).catch(err => { throw err });

	//creating chat between itself
	await chats.insertNew(user_id, user_id);

	res.cookie("user_id", user_id, {maxAge: '360000000'});
	res.redirect('../../index.html');
}

//filename - //account //auth //users
