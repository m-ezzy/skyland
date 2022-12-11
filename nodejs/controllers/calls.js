let calls = require("../models/calls")
let groups = require("../models/groups")
let users = require("../models/users")


exports.load = async (req, res) => {
	res.render('calls', {'data': ''}, (err, html) => {
		res.contentType('text/json');
		res.send({'json': '', 'html': html});
	})
}
exports.get_previous = async (req, res) => {
	let user_id = req.cookies.user_id

	let data = {
		chats: [],
		groups: []
	}

	let data1 = await calls.selectPreviousCallsChats(req.cookies.user_id);
	for (let i = 0 ; i < data1.length ; i++) {
		let r = data1[i]
		let user_id3 = (req.cookies.user_id == r.user_id1) ? r.user_id2 : r.user_id1
		let o = await users.selectUserInfoCalls(user_id3)
		data.chats.push({...r, ...o})
	}
	console.log(data.chats)

	data.groups = await calls.selectPreviousCallsGroups(user_id)

	res.render("calls/list_previous", {"data": data, "user_id": user_id}, (err, html) => {
		res.send({"json": data, "html": html})
	})
}
exports.make_call_chats = async (req, res) => {
	let call_type = req.body.call_type == "audio" ? 6 : 7
    let status = await calls.insertCallChats(req.body.chat_id, req.cookies.user_id, call_type)
	res.json({"status": status})
}
exports.make_call_groups = async (req, res) => {
    let status = await calls.insertCallGroups(req.body.group_id, req.cookies.user_id, req.body.call_type)
	res.json({"status": status})
}
exports.change_call_length_chats = async (req, res) => {
	let call_type = req.body.call_type == "audio" ? 6 : 7
    let status = await calls.updateCallChats(req.body.chat_id, req.cookies.user_id, call_type, req.body.time)
	res.json({"status": status})
}
