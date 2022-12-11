let models = {
	chats: require("../models/chats"),
	users: require("../models/users")
}
/* OR */
let chats = require("../models/chats")
let users = require("../models/users")
/* OR */
let { selectPrevious, insertNew, updateBlock, selectPreviousMedia, countPreviousMedia, insertMediaMessage } = require('../models/chats')
let { selectUserInfo, selectUserSearch } = require('../models/users.js')

exports.load = async (req, res) => {
	res.render('chats', {'data': ''}, (err, html) => {
		res.contentType('text/json')
		res.send({'json': '', 'html': html})
	})
}
exports.get_previous = async (req, res) => {
	let user_id = req.cookies.user_id
	let p = {}

	let rows = await selectPrevious(user_id)
	let row_num = await countPreviousMedia()

	for (let i = 0 ; i < rows.length ; i++) {
	//await rows.forEach(async (r) => {
		let r = rows[i]

		p[r.chat_id] = {user_id: 0, user_name: '', first_name: '', last_name: '', extension: '', row_up: row_num, row_down: row_num}
		p[r.chat_id].user_id = (r.user_id1 == user_id) ? r.user_id2 : r.user_id1

		let o = await selectUserInfo(p[r.chat_id].user_id)
		/*console.log(o)*/

		p[r.chat_id].user_name = o.user_name
		p[r.chat_id].first_name = o.first_name
		p[r.chat_id].last_name = o.last_name
		p[r.chat_id].extension = o.extension
	}
	/*
	res.contentType('text/json');
	res.send(JSON.stringify(p));
	//res.json(p);
	*/
	res.contentType('text/json')
	res.send({'json': p, 'html': ''})
}
exports.search_new = async (req, res) => {   //search_new_user_chat //search_new
	let user_id = req.cookies.user_id
	let q = req.body.q
	let rows = await selectUserSearch(q)
	res.contentType('text/json')
	res.send(rows)
}
exports.create_new = async (req, res) => {
	let user_id = req.cookies.user_id
	let user_id2 = req.body.user_id2
	let {insertId} = await insertNew(user_id, user_id2)
	//mkdir(`../../../data/chats/chat_id_${chat_id}`)
	res.contentType('text/json')
	res.send(JSON.stringify({'status': 'success', 'chat_id': insertId, 'row_down': 10}))
}
exports.block_unblock = async (req, res) => {
	let user_id = req.cookies.user_id
	let user_id2 = req.body.user_id2
	let chat_id = req.body.chat_id
	let status = await updateBlock(user_id, user_id2)
	res.contentType('text/json')
	res.send("success")
}
exports.history_conv = async (req, res) => {
	let user_id = req.cookies.user_id
	let chat_id = req.body.chat_id
	let row_up = req.body.row_up
	let rows = await selectPreviousMedia(chat_id, row_up)
	res.contentType('text/json')
	res.send(JSON.parse(JSON.stringify(rows)))
}
exports.send_message = async (req, res) => {
	let user_id = req.cookies.user_id
	let chat_id = req.body.chat_id
	let encrypted_message = req.body.encrypted_message
	let chat_media_id = await insertMediaMessage(chat_id, user_id, encrypted_message)
	res.contentType("text/json")
	res.send(JSON.stringify({"chat_media_id": chat_media_id}))
}
