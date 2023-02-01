import fs from 'fs'
import path from 'path'
// import mime from 'mime'
import chatsModel from "../models/chats.js"
import usersModel from "../models/users.js"
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
	res.contentType('text/json')
	res.send(JSON.stringify(rows))
}
chatsController.create = async (req, res) => {
	let chat_id = await chatsModel.insert(req.cookies.user_id, req.body.user_id2)
	res.send({status: 'success', chat_id: chat_id, row_down: 10})
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
	for(let i = 0 ; i < req.files.length ; i++) {
		let { extension, media_type_id, media_type } = get_media_type(req.files[i].originalname)
		let chat_media_id = await chatsModel.media.insert(req.body.conv_id, req.cookies.user_id, media_type_id, extension)

		// fs.renameSync(process.cwd() + '\\' + req.files[i].path, process.cwd() + `\\public\\data\\chats\\${chat_media_id}.${extension}`)
		fs.renameSync(path.resolve(process.cwd(), req.files[i].path), path.resolve(process.cwd(), `..\\client\\public\\data\\chats\\${chat_media_id}.${extension}`))
		arr.push({
			media_id: chat_media_id,
			media_type: media_type,
			text: extension
		})
	}
	// res.json({media_id: rows.insertId, time: time})
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
chatsController.delete = async (req, res) => {
	let status = ''
	if (req.body.block) {
		status = await chatsModel.update(req.body.chat_id, req.cookies.user_id)
	} else {
		// also delete all media files in data folder
		let status1 = await chatsModel.media.delete(req.body.chat_id)
		let status2 = await chatsModel.delete(req.body.chat_id)
	}
	res.json({status: status})
}

export default chatsController
