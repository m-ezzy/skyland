import fs from 'fs'
import groupsModel from "../models/groups.js"
import usersModel from "../models/users.js"

let groupsController = {}

groupsController.load = async (req, res) => {
	res.render('content/groups', {data: ''}, (err, html) => {
		res.send({html: html})
	})
}
groupsController.previous_conv = async (req, res) => {
	let rows = await groupsModel.select_previous(req.cookies.user_id)
	let row_num = await groupsModel.media.count()

	let p = {}
	//await rows.forEach(async (r) => {
	for (let i = 0 ; i < rows.length ; i++) {
		let r = rows[i]

		p[r.group_id] = {
			conv_name: r.group_name,
			group_name: r.group_name,
			title: r.title,
			extension: r.extension,
			row_up: row_num + 1,
			row_down: row_num,
			media: new Map(),
			members: {}
		}
		let rows3 = await groupsModel.members.select(r.group_id)
		rows3.forEach(m => {
			p[r.group_id]['members'][m.user_id] = {
				title: `${m.first_name} ${m.last_name}`,

				user_name: m.user_name,
				first_name: m.first_name,
				last_name: m.last_name,
				extension: m.extension
			}
		})
	}
	res.send(p)
}
groupsController.search_create_new = async (req, res) => {
	let rows = await groupsModel.selectSearchCreateNew(req.cookies.user_id, req.body.q)
	res.send(rows)
}
groupsController.create = async (req, res) => {   //create //create_new
	let group_id = await groupsModel.insert(req.body.group_name, req.body.title, req.cookies.user_id)
	let status = await groupsModel.members.insert(group_id, req.cookies.user_id)
	let row_num = await groupsModel.media.count()
	res.send({group_id: group_id, row_num: row_num})
	// res.contentType('text/json')
	// res.send(JSON.stringify({'group_id': group_id, 'value': value}))
}
groupsController.previous_media = async (req, res) => {
	let rows = await groupsModel.media.select(req.body.group_id, req.body.row_up)
	res.send(rows)
}
groupsController.send_media_message = async (req, res) => {
	let group_media_id = await groupsModel.media.insert(req.body.conv_id, req.cookies.user_id, 1, req.body.encrypted_message)
	res.send({media_id: group_media_id})
}
groupsController.send_media_files = async (req, res) => {
	let arr = []
	for(let i = 0 ; i < req.files.length ; i++) {
		let media_type = 2
		let extension = (req.files[i].originalname.split('.'))[1]
		let group_media_id = await groupsModel.media.insert(req.body.group_id, req.cookies.user_id, media_type, extension)

		fs.renameSync(process.cwd() + '\\' + req.files[i].path, process.cwd() + `\\public\\data\\groups\\${group_media_id}.${extension}`)
		// fs.renameSync(req.files[i].path, `./data/groups/${group_media_id}.${extension}`)
		arr.push({
			media_id: group_media_id,
			media_type: media_type,
			text: extension
		})
	}
	res.send(JSON.stringify(arr))
}
groupsController.update_info = async (req, res) => {
	let status = await groupsModel.update(req.body.conv_id, req.body.o)
	res.send({status: status}) //status //result
}
groupsController.update_icon = async (req, res) => {
	let extension = req.file.originalname.split('.')[1]
	let status = await groupsModel.update(req.body.conv_id, `extension='${extension}'`)
	// deleting file
	fs.unlinkSync(process.cwd() + `\\public\\data\\icons\\groups\\${req.body.conv_id}.${req.body.old_extension}`)
	// copying file
	fs.renameSync(process.cwd() + '\\' + req.file.path, process.cwd() + `\\public\\data\\icons\\groups\\${req.body.conv_id}.${extension}`)
	res.send({status: status})
}
groupsController.add_member = async (req, res) => {   //add_member //join
	let rows = await usersModel.check_user_name(req.body.user_name)
	let user = rows[0]
	let status = await groupsModel.members.insert(req.body.group_id, user.user_id)
	res.send({
		user_id: user.user_id,
		value: {
			user_name: user.user_name,
			first_name: user.first_name,
			last_name: user.last_name,
			extension: user.extension
		}
	})
}
groupsController.leave = async (req, res) => {
	let rows1 = await groupsModel.members.delete(req.body.group_id, req.cookies.user_id)
	let rows2 = await groupsModel.members.select(req.body.group_id)
	if (rows2.length == 0) {
		let rows3 = await groupsModel.media.delete(req.body.group_id)
		let rows4 = await groupsModel.delete(req.body.group_id)
	}
	res.send({status: 'success'})
}

export default groupsController
