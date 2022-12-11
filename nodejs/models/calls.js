let db = require('../database.js')
let config = require('../config.js')

exports.selectPreviousCallsChats = async (user_id) => {
    //let query = `SELECT * FROM calls_chats WHERE chat_id in (SELECT chat_id FROM chats WHERE user_id1=${user_id} OR user_id2=${user_id})`

    //2 table join. ran correctly on first go!
    let query = `SELECT calls_chats.chat_id,calls_chats.user_id,calls_chats.call_type,calls_chats.time_created,calls_chats.call_length,chats.user_id1,chats.user_id2 FROM calls_chats INNER JOIN chats ON calls_chats.chat_id=chats.chat_id WHERE chats.user_id1=${user_id} OR chats.user_id2=${user_id}`

    //3 table join  //try to solve this
    //let query = `SELECT calls_chats.chat_id,calls_chats.user_id,calls_chats.call_type,calls_chats.time_created,calls_chats.call_length,chats.user_id1,chats.user_id2,users.user_name,users.first_name,users.last_name,users.extension FROM ((calls_chats INNER JOIN chats ON calls_chats.chat_id=chats.chat_id) INNER JOIN users ON calls_chats.user_id=${user_id}) WHERE chats.user_id1=${user_id} OR chats.user_id2=${user_id}`

    let rows = await db.query(query).catch(err => { throw err })
    console.log(rows)
	return JSON.parse(JSON.stringify(rows))
}
exports.selectPreviousCallsGroups = async (user_id) => {
    //let query = `SELECT * FROM calls_groups WHERE group_id in (SELECT group_id FROM groups WHERE user_id=${user_id})`
    let query = `SELECT calls_groups.group_id,calls_groups.user_id,calls_groups.call_type,groups.group_name,groups.title,groups.extension FROM calls_groups INNER JOIN groups ON calls_groups.group_id=groups.group_id WHERE groups.user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
exports.insertCallChats = async (chat_id, user_id, call_type) => {
    let query = `INSERT INTO calls_chats(chat_id,user_id,call_type) VALUES('${chat_id}',${user_id},${call_type})`
	let rows = await db.query(query).catch(err => { throw err })
    return (rows[0] ? "1" : "0")   //return timestamp because it will be needed to update this row
}
exports.insertCallGroups = async (group_id, user_id, call_type) => {
    let query = `INSERT INTO calls_groups(group_id,user_id,call_type) VALUES('${group_id}',${user_id},${call_type})`
	let rows = await db.query(query).catch(err => { throw err })
    return (rows[0] ? "1" : "0")
}
exports.updateCallChats = async (chat_id, user_id, call_type, time) => {
    let query = `UPDATE calls_chats SET call_length=1 WHERE chat_id=${chat_id} AND user_id=${user_id} AND call_type=${call_type} AND time_created=${time}`
	let rows = await db.query(query).catch(err => { throw err })
    return {"satus": "success"}
}
