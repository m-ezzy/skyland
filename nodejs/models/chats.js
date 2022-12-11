let db = require('../database.js')
let config = require('../config.js')

exports.selectPrevious = async (user_id) => {   //getPreviousChats //selectPreviousList //selectPrevious
	let query = `SELECT chat_id,user_id1,user_id2,created_on FROM chats WHERE user_id1=${user_id} OR user_id2=${user_id} ORDER BY created_on DESC`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
exports.insertNew = async (user_id, user_id2) => {
	let query = `INSERT INTO chats(user_id1,user_id2) VALUES('${user_id}','${user_id2}')`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
exports.updateBlock = async (user_id, user_id2, chat_id) => {
	let query = `UPDATE chats SET deleted_by=${user_id} WHERE chat_id=${chat_id}`
	let rows = await db.query(query).catch(err => { throw err })
	return "success"
}
exports.selectPreviousMedia = async (chat_id, row_up) => {
	//let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id>${row_up} LIMIT ${limit}`
	let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id<=${row_up}`
	let rows = await db.query(query).catch(err => { throw err })
	console.log(rows.length)

	let limit = config.limit
	if (rows.length < limit) {
		limit = rows.length
	}
	console.log(limit)

	return rows.splice(rows.length - limit, limit)
}
exports.countPreviousMedia = async () => {
	let query = `SELECT COUNT(*) FROM chat_media`
	let rows = await db.query(query).catch(err => { throw err })
	return rows[0]['COUNT(*)']
}
exports.insertMediaMessage = async (chat_id, user_id, encrypted_message) => {
	let query = `INSERT INTO chat_media(chat_id,user_id,media_type,text) VALUES (${chat_id},${user_id},0,'${encrypted_message}')`
	let rows = await db.query(query).catch(err => { throw err })
	return rows.insertId
}
