import fs from 'fs'
import path from 'path'
import usersModel from "../models/users.js"
import chatsModel from "../models/chats.js"

let usersController = {}

usersController.check_user_name = async (req, res) => {
	let rows = await usersModel.check_user_name(req.body.user_name)
	res.json(rows)
}
usersController.check_pass_word = async (req, res) => {
	let rows = await usersModel.check_pass_word(req.body.user_name, req.body.pass_word)
	res.json(rows)
}
usersController.load = async (req, res) => {
	let data = await usersModel.select(req.cookies.user_id)
	let src = data.extension == null ? 'media/images/place_holder/user.png' : `api/users/get_file_data/icons/${data.user_id}.${data.extension}`

	res.render('content/account', {...data, src: src}, (err, html) => {
		res.send({html: html})
	})
}
usersController.get_info = async (req, res) => {
	let data = await usersModel.select(req.cookies.user_id)
	res.send(data)
}
usersController.update_info = async (req, res) => {
	let status = await usersModel.update(req.body.object)   //or use spread operator
	res.json({status: status})
}
usersController.update_profile_picture = async (req, res) => {
	fs.renameSync(req.file.path, `${process.cwd()}/data/icons/users/${req.cookies.user_id}.${path.extname(req.file.originalname)}`)
	let status = await usersModel.update(req.cookies.user_id, `extension=${path.extname(req.file.originalname)}`)
	res.json({status: 'success'})
}
usersController.get_file_data_icons = async (req, res) => {
	const stream = fs.createReadStream(process.cwd() + `/data/icons/users/${req.params.file_name}`)
	stream.pipe(res)
}
usersController.delete_account = async (req, res) => {
	let user_id = req.cookies.user_id
	// delete/leave all channels, channel members and channel media
	// leave all groups, group members and group media
	// leave all chats and chat media
	// delete user
	// res.json({status: "success"})
}

export default usersController
