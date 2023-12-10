import fs from 'fs'
import path from 'path'
import usersModel from "../models/users.js"
import chatsModel from "../models/chats.js"

let usersController = {}

usersController.sign_up_load = async (req, res) => {
	res.render('auth/sign_up', {data: ''}, (err, html) => {
		res.send({html: html})
	})
}
usersController.log_in_load = async (req, res) => {
	/*fs.readFileSync(process.cwd() + "\\server\\views\\log_in.html", (err, content) => {
		res.json({html: content})
	})*/

	// res.sendFile(process.cwd() + "\\server\\views\\log_in.html")
	
	res.render('auth/log_in', {data: ''}, (err, html) => {
		res.send({html: html})
	})
}
usersController.sign_up = async (req, res) => {
	let row = await usersModel.select_from_user_name(req.body.user_name)
	if(row) {
		res.json({status: 'username is not available'})
	} else {
		let user_id = await usersModel.insert(req.body.user_name, req.body.pass_word, req.body.first_name, req.body.last_name)

		//creating chat between itself
		await chatsModel.insert(user_id, user_id)

		res.cookie('user_id', user_id, {maxAge: '3600000000'})
		// res.cookie('user_name', req.body.user_name, {maxAge: '360000000'})
		// res.redirect('/')
		// res.json({user_id: user_id, user_name: req.body.username})
		res.send({status: 'success'})
	}
}
usersController.log_in = async (req, res) => {
	let row = await usersModel.select_from_user_name_and_pass_word(req.body.user_name, req.body.pass_word)
	// if (row.pass_word == req.body.pass_word) {
	if(row) {
		res.cookie('user_id', row.user_id, {maxAge: '3600000000'})
		// res.cookie('username', rows[0].user_name, {maxAge: '360000000'})
		// res.redirect('/')
		res.send({status: 'success'})
	} else {
		res.json({
			status: 'failure',
			reason: 'username is not registered'
		})
	}
}
usersController.check_user_name = async (req, res) => {
	let row = await usersModel.select_from_user_name(req.body.conv_name)
	res.send(row ? false : true)
}
usersController.check_pass_word = async (req, res) => {
	let row = await usersModel.select_from_user_name_and_pass_word(req.body.user_name, req.body.pass_word)
	res.json(row ? true : false)
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
	let status = await usersModel.update(req.cookies.user_id, req.body.s)   //or use spread operator
	res.json({status: status})
}
usersController.update_icon = async (req, res) => {
	let extension_new = req.file.originalname.split('.')[1] //path.extname(req.file.originalname)

	// deleting old icon
	if(req.body.extension_old != 'null') {
		fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\icons\\users\\${req.cookies.user_id}.${req.body.extension_old}`))
	}
	fs.renameSync(req.file.path, path.resolve(process.cwd(), `..\\client\\public\\data\\icons\\users\\${req.cookies.user_id}.${extension_new}`))

	let status = await usersModel.update(req.cookies.user_id, `extension='${extension_new}'`)
	res.json({status: status})
}
usersController.get_file_data_icons = async (req, res) => {
	const stream = fs.createReadStream(process.cwd() + `/data/icons/users/${req.params.file_name}`)
	stream.pipe(res)
}
usersController.delete = async (req, res) => { //delete_account
	let user_id = req.cookies.user_id

	// delete/leave all channels, channel members and channel media

	// leave all groups, group members and group media

	// leave all chats and chat media
	// let status10 = await chatsModel.delete_all(user_id)

	// delete user
	let status50 = await usersModel.delete(user_id)
	res.json({status: "success"})
}

export default usersController
