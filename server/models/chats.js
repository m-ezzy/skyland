import { execute_query } from '../database.js'
import configs from '../configs.js'

const chatsModel = {
	media: {}
}

chatsModel.select_previous = async (user_id) => {   //getPreviousChats //selectPreviousList //selectPrevious
	let query = `SELECT chat_id AS conv_id,user_id1,user_id2,created_on,deleted_by FROM chats WHERE user_id1=${user_id} OR user_id2=${user_id} ORDER BY created_on DESC`
	let rows = await execute_query(query)
	return rows
	//return db.execute_query(query)
}
chatsModel.select_new = async (user_id, q) => { //select_search_new //this should be in users model or not
	let query = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_name LIKE '%${q}%' OR first_name LIKE '%${q}%' OR last_name LIKE '%${q}%'`
	//let query = `SELECT users.user_id,users.user_name,users.first_name,users.last_name,users.extension FROM users INNER JOIN chats ON users.user_id=chats.user_id1 WHERE (chats.user_id1<>${user_id} AND chats.user_id2<>${user_id}) AND (users.user_name LIKE '%${q}%' OR users.first_name LIKE '%${q}%' OR users.last_name LIKE '%${q}%')`
	let rows = await execute_query(query)
	return rows
}
chatsModel.insert = async (user_id, user_id2) => {
	let query = `INSERT INTO chats(user_id1,user_id2) VALUES('${user_id}','${user_id2}')`
	let rows = await execute_query(query)
	return rows.insertId
}
chatsModel.update = async (chat_id, user_id) => {
	let query = `UPDATE chats SET deleted_by=${user_id} WHERE chat_id=${chat_id}`
	let rows = await execute_query(query)
	return "success"
}
chatsModel.delete = async (chat_id) => {
	let query = `DELETE FROM chats WHERE chat_id=${chat_id}`
	let rows = await execute_query(query)
	return "success"
}

chatsModel.media.count = async () => {
	let query = `SELECT COUNT(*) FROM chat_media`
	let rows = await execute_query(query)
	return rows[0]['COUNT(*)']
	//return db.execute_query(query)
}
chatsModel.media.last_id = async () => {
	let query = `SELECT * FROM chat_media`
	let rows = await execute_query(query)
	return rows[rows.length - 1].chat_media_id
}
chatsModel.media.select = async (chat_id, row_up) => {
	// let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id>${row_up} LIMIT ${limit}`
	// let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id<=${row_up}`
	let query = `SELECT chat_media.chat_media_id AS media_id,chat_media.chat_id AS conv_id,chat_media.user_id,chat_media.time_sent,media_types.type AS media_type,chat_media.text FROM chat_media INNER JOIN media_types ON chat_media.media_type=media_types.media_type_id WHERE chat_media.chat_id=${chat_id} AND chat_media.chat_media_id<=${row_up}`
	let rows = await execute_query(query)
	//let rows = await db.execute_query(query)
	console.log(rows.length)

	let limit = configs.limit
	if (rows.length < limit) {
		limit = rows.length
	}
	console.log(limit)
	return rows.splice(rows.length - limit, limit)
}
chatsModel.media.insert = async (chat_id, user_id, media_type, text) => {
	let query = `INSERT INTO chat_media(chat_id,user_id,media_type,text) VALUES (${chat_id},${user_id},${media_type},'${text}')`
	let rows = await execute_query(query)
	return rows.insertId
}
chatsModel.media.update = async (chat_id, o) => {
	let query = `UPDATE chat_media SET ${o} WHERE chat_id=${chat_id}`
	let rows = await execute_query(query)
	return "success"
}
chatsModel.media.delete = async (chat_id) => {
	let query = `DELETE FROM chat_media WHERE chat_id=${chat_id}`
	let rows = await execute_query(query)
	return "success"
}

export default chatsModel
