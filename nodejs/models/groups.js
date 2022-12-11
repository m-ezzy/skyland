let db = require('../database.js')
let config = require('../config.js')

exports.selectGroupInfo = async (group_id) => {
	let query = `SELECT * FROM groups WHERE group_id=${group_id}`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
exports.selectPrevious = async (user_id) => {   //selectPreviousGroups
    let query = `SELECT groups.group_id,groups.group_name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.group_id=group_members.group_id WHERE group_members.user_id=${user_id}`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
exports.selectSearchCreateNew = async (user_id, q) => {
	//let query = `SELECT * FROM groups WHERE group_name LIKE '${q}%' OR title LIKE '${q}%'`
	//let query = `SELECT groups.group_id,groups.group_name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.group_id=group_members.group_id WHERE (groups.group_name LIKE '${q}%' OR groups.title LIKE '${q}%') AND group_members.user_id!=${user_id}`
	let query = `SELECT groups.group_id,groups.group_name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.group_id=group_members.group_id WHERE groups.group_name='${q}'`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
exports.insertNew = async (group_name, title, user_id) => {
	let query = `INSERT INTO groups(group_name,title,user_id) VALUES('${group_name}','${title}',${user_id})`
	let rows = await db.query(query).catch(err => { throw err })
	return rows.insertId
}
exports.selectMembers = async (group_id) => {
	let query = `SELECT users.user_id,users.user_name,users.first_name,users.last_name,users.extension FROM users INNER JOIN group_members ON group_members.user_id=users.user_id WHERE group_members.group_id=${group_id}`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
exports.insertMember = async (group_id, user_id) => {
	let query = `INSERT INTO group_members(group_id,user_id) VALUES('${group_id}',${user_id})`
	let rows = await db.query(query).catch(err => { throw err })
	return "success"
}
exports.deleteMember = async (group_id, user_id) => {
	let query = `DELETE FROM group_members WHERE group_id=${group_id} AND user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
	return "success";
}
exports.selectPreviousMedia = async (group_id, row_up) => {
	//let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id>${row_up} LIMIT ${limit}`
	let query = `SELECT * FROM group_media WHERE group_id=${group_id} AND group_media_id<=${row_up}`
	let rows = await db.query(query).catch(err => { throw err })
	let limit = config.limit
	if (rows.length < limit) {
		limit = rows.length
	}
	console.log(limit)
	return rows.splice(rows.length - limit, limit)
}
exports.countPreviousMedia = async () => {
	let query = `SELECT COUNT(*) FROM group_media`
	let rows = await db.query(query).catch(err => { throw err })
	return rows[0]['COUNT(*)']
}
exports.insertMediaMessage = async (group_id, user_id, encrypted_message) => {
	let query = `INSERT INTO group_media(group_id,user_id,media_type,text) VALUES(${group_id},${user_id},0,'${encrypted_message}')`
	let rows = await db.query(query).catch(err => { throw err })
	return rows.insertId
}
