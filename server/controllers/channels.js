import * as channelsModel from '../models/channels.js'
import usersModel from "../models/users.js"

export const load = async (req, res) => {
	res.render('content/channels', {data: ''}, (err, html) => {
		res.send({html: html})
	})
}
export const previous_conv = async (req, res) => {
	let user_id = req.cookies.user_id
	let rows = await channelsModel.select_previous(user_id)
	let row_num = await channelsModel.media.count()
	let p = {}

	for (let i = 0 ; i < rows.length ; i++) {
		let r = rows[i]
		p[r.channel_id] = {'channel_name': r.channel_name, 'title': r.title, 'extension': r.extension, 'user_id': r.user_id, 'row_up': row_num, 'row_down': row_num, 'members': {}}

		let rows3 = await channelsModel.members.select(r.channel_id)
		let member_type = ['', 'founder', 'manager', 'regular']

		for (let j=0 ; j<rows3.length ; j++) {
			let m = rows3[j]
			p[r.channel_id]['members'][m.user_id] = {'user_name': m.user_name, 'first_name': m.first_name, 'last_name': m.last_name, 'extension': m.extension, 'member_type': member_type[m.member_type]}
		}
	}
	res.send(p)
}
export const search_new = async (req, res) => {
	let rows = await channelsModel.select_new(req.cookies.user_id, req.body.q)
	res.send(rows)
}/*
export const search_new_exact_match = async (req, res) => {
	let rows = await channelsModel.selectExactMatch(req.cookies.user_id, req.body.q)
	res.contentType('text/json')
	res.send(rows)
}*/
export const join = async (req, res) => {
	let status = await channelsModel.members.insert(req.body.channel_id, req.cookies.user_id, 3)
	res.send({status: status})
}
export const create = async (req, res) => {
	let channel_id = await channelsModel.insert(req.cookies.user_id, req.body.channel_name, req.body.title)
	let rows = await channelsModel.members.insert(channel_id, req.cookies.user_id, 1)
	res.send({channel_id: channel_id})
}
export const previous_media = async (req, res) => {
	let rows = await channelsModel.media.select(req.body.channel_id, req.body.row_up)
	res.send(rows)
}
export const send_media_message = async (req, res) => {
	let channel_media_id = await channelsModel.media.insert(req.body.channel_id, req.cookies.user_id, 1, req.body.message)
	res.send({channel_media_id: channel_media_id})
}
export const send_media_files = async (req, res) => {
	let arr = []
	for(let i = 0 ; i < req.files.length ; i++) {
		let media_type = 2
		let extension = (req.files[i].originalname.split('.'))[1]
		let channel_media_id = await channelsModel.media.insert(req.body.channel_id, req.cookies.user_id, media_type, extension)
		fs.renameSync(req.files[i].path, `./data/channels/${channel_media_id}.${extension}`)
		arr.push({
			channel_media_id: channel_media_id,
			media_type: media_type,
			text: extension
		})
	}
	res.send(arr)
}
export const update_info = async (req, res) => {
	let status = await channelsModel.update(req.body.channel_id, req.body.o)
	res.send({status: status})
}
export const update_icon = async (req, res) => {
	let extension = req.file.originalname.split('.')[1]
	let status = await channelsModel.update(req.body.channel_id, `extension='${extension}'`)
	fs.renameSync(req.file.path, `./data/icons/channels/${req.body.channel_id}.${extension}`)
	res.send({status: status})
}
export const promote_demote = async (req, res) => {
	let status = await channelsModel.members.update(req.body.channel_id, req.body.user_id, req.body.member_type)
	res.send({status: status})
}
export const leave = async (req, res) => {
	let status = await channelsModel.members.delete(req.body.channel_id, req.cookies.user_id)
	res.json({status: status})
}
export const delete_channel = async (req, res) => {
	let rows1 = await channelsModel.media.delete_all(req.body.channel_id, req.cookies.user_id)
	let rows2 = await channelsModel.members.delete_all(req.body.channel_id, req.cookies.user_id)
	let rows3 = await channelsModel.delete_channel(req.body.channel_id, req.cookies.user_id)
	res.json({status: "success"})
}
