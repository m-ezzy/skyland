import fs from 'fs'
// import path from 'path'
// import mime from 'mime'
import chatsModel from "../models/chats.js"
import usersModel from "../models/users.js"

let chatsController = {}

chatsController.load = async (req, res) => {
	res.render('content/chats', {data: ''}, (err, html) => {
		res.json({html: html})
	})
}
chatsController.previous_conv = async (req, res) => {
	let rows = await chatsModel.select_previous(req.cookies.user_id)
	let row_num = await chatsModel.media.count()

	let p = {}
	//await rows.forEach(async (r) => {
	for (let i = 0 ; i < rows.length ; i++) {
		let r = rows[i]

		let user_id = (r.user_id1 == req.cookies.user_id) ? r.user_id2 : r.user_id1
		let o = await usersModel.select_basic(user_id)

		p[r.chat_id] = {
			conv_id: o.user_id,
			conv_name: o.user_name,
			title: `${o.first_name} ${o.last_name}`,

			user_id: user_id,
			user_name: o.user_name,
			first_name: o.first_name,
			last_name: o.last_name,
			extension: o.extension,
			row_up: row_num + 1,
			row_down: row_num,
			deleted_by: r.deleted_by,

			media: new Map()
		}
	}
	res.send(p)
}
chatsController.search_new = async (req, res) => {   //search_new_user_chat //search_new
	let rows = await chatsModel.selectSearchNew(req.cookies.user_id, req.body.q)
	res.contentType('text/json')
	res.send(JSON.stringify(rows))
}
chatsController.create = async (req, res) => {
	let chat_id = await chatsModel.insert(req.cookies.user_id, req.body.user_id2)
	res.send({status: 'success', chat_id: chat_id, row_down: 10})
}
chatsController.previous_media = async (req, res) => {
	let rows = await chatsModel.media.select(req.body.chat_id, req.body.row_up)
	res.json(rows)
}
chatsController.send_media_message = async (req, res) => {
	let chat_media_id = await chatsModel.media.insert(req.body.conv_id, req.cookies.user_id, 1, req.body.encrypted_message)
	res.send({media_id: chat_media_id})
}

let file_types = [
	[],
	[],
	['image', 'jpg', 'jpeg', 'png'],
	['video', 'mp4', 'mkv'],
	['audio', 'mp3'],
	['document', 'pdf', 'doc', 'docx', 'txt', 'html']
]

chatsController.send_media_files = async (req, res) => {
	let arr = []
	for(let i = 0 ; i < req.files.length ; i++) {
		let extension = (req.files[i].originalname.split('.'))[1]
		// let extension = path.extname(req.files[i].originalname)

		let media_type_id = 5
		for(let j = 0 ; j < file_types.length ; j++) {
			for(let k = 1 ; k < file_types[j].length ; k++) {
				if(file_types[j][k] == extension) {
					media_type_id = j
					break
				}
			}
		}
		let chat_media_id = await chatsModel.media.insert(req.body.chat_id, req.cookies.user_id, media_type_id, extension)

		fs.renameSync(process.cwd() + '\\' + req.files[i].path, process.cwd() + `\\public\\data\\chats\\${chat_media_id}.${extension}`)
		arr.push({
			media_id: chat_media_id,
			media_type: file_types[media_type_id][0],
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
chatsController.delete = async (req, res) => {
	let status = ''
	if (req.body.block) {
		status = await chatsModel.update(req.body.chat_id, req.cookies.user_id)
	} else {
		let status1 = await chatsModel.media.delete(req.body.chat_id)
		let status2 = await chatsModel.delete(req.body.chat_id)
	}
	res.json({status: status})
}
chatsController.unblock = async (req, res) => {
	let status = await chatsModel.update(req.body.chat_id, null)
	res.json({status: status})
}

export default chatsController
