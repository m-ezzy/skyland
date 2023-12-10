import fs from 'fs'
import path from 'path'
// import mime from 'mime'
import chatsModel from "../models/chats.js"
import usersModel from "../models/users.js"
import callsModel from '../models/calls.js'
import { get_media_type } from './upload_file.js'

let chatsController = {}

/*chatsController.load = async (req, res) => {
	res.render('content/chats', {data: ''}, (err, html) => {
		res.json({html: html})
	})
}*/
chatsController.previous_conv = async (req, res) => {
	let rows = await chatsModel.select_previous(req.cookies.user_id)
	// let row_num = await chatsModel.media.count()
	let last_id = await chatsModel.media.last_id()
	let p = {}

	//await rows.forEach(async (r) => {
	for (let i = 0 ; i < rows.length ; i++) {
		let user_id = (rows[i].user_id1 == req.cookies.user_id) ? rows[i].user_id2 : rows[i].user_id1
		let user = await usersModel.select_basic(user_id)

		delete rows[i].user_id1
		delete rows[i].user_id2
		rows[i] = {
			...rows[i],
			...user,
			// conv_id: user_id,
			conv_name: user.user_name,
			title: `${user.first_name} ${user.last_name}`,
		}
	}
	// })
	res.send({
		last_id: last_id,
		convs: rows,
	})
}
chatsController.search_new = async (req, res) => {   //search_new_user_chat //search_new
	let rows = await chatsModel.select_new(req.cookies.user_id, req.body.q)

	// rows.forEach(row => {
	for(let i=0 ; i<rows.length ; i++) {
		rows[i]['title'] = `${rows[i].first_name} ${rows[i].last_name}`
	}
	res.contentType('text/json')
	res.send(rows)
}
chatsController.create = async (req, res) => {
	let chat_id = await chatsModel.insert(req.cookies.user_id, req.body.user_id)
	res.send({status: 'success', conv_id: chat_id, row_down: 10})
}
chatsController.previous_media = async (req, res) => {
	let rows = await chatsModel.media.select(req.body.conv_id, req.body.row_up)
	res.json(rows)
}
chatsController.send_media_message = async (req, res) => {
	let chat_media_id = await chatsModel.media.insert(req.body.conv_id, req.cookies.user_id, 1, req.body.text)
	res.send({media_id: chat_media_id})
}
chatsController.send_media_files = async (req, res) => {
	let arr = []
	let details = JSON.parse(req.body.details)

	console.log(req.files)

	let i = 0
	for(const file of req.files) {
		let extension = file.originalname.split('.')[1]

		let media_id = await chatsModel.media.insert(req.body.conv_id, req.cookies.user_id, details[i], extension)

		fs.renameSync(path.resolve(process.cwd(), file.path), path.resolve(process.cwd(), `..\\client\\public\\data\\chats\\${media_id}.${extension}`))
		
		arr.push({
			media_id: media_id,
			text: extension
		})
		i++
	}
	res.send(JSON.stringify(arr))
}
chatsController.get_file_data_media = async (req, res) => {
	// res.setHeader('Content-Type', mime.getType(extension))
	const stream = fs.createReadStream(process.cwd() + `/data/chats/${req.params.file_name}`)
	stream.pipe(res)
}
chatsController.unblock = async (req, res) => {
	let status = await chatsModel.update(req.body.chat_id, null)
	res.json({status: status})
}
chatsController.leave = async (req, res) => {
	let status = await chatsModel.update(req.body.conv_id, req.cookies.user_id)
	res.json({status: status})
}
chatsController.delete = async (req, res) => {
	let status1 = await callsModel.chats.delete(req.body.conv_id)

	let rows1 = await chatsModel.media.select(req.body.conv_id, 1000000000000000, true)
	rows1.forEach(file => {
		if(file.media_type != 'message') {
			fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\chats\\${file.media_id}.${file.text}`))
		}
	})
	let status2 = await chatsModel.media.delete(req.body.conv_id)
	let status3 = await chatsModel.delete(req.body.conv_id)

	res.json({status: status1})
}

export default chatsController
