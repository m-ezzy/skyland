let users = require("../models/users");

exports.load = async (req, res) => {
	let data = await users.selectUserInfo(req.cookies.user_id)

	res.render('account', {'data': data}, (err, html) => {
		res.contentType('text/json')
		res.send({'json': data, 'html': html})
	})
}
exports.user_name_available = async (req, res) => {
	let answer = await users.selectUserNameAvailable(req.body.user_name);
	// type of content before it was sent as a string
	res.contentType('text/json');
	res.send({"answer": answer});
}
exports.update_info = async (req, res) => {
	let rows = await users.updateInfo(req.body.object);   //or use spread operator
	res.json({"status": "success"});
}
