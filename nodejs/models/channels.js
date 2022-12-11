let db = require('../database.js');
let config = require('../config.js');

exports.selectPrevious = async (user_id) => {   //selectPreviouschannels
    let query = `SELECT channels.channel_id,channels.channel_name,channels.title,channels.extension FROM channels INNER JOIN channel_members ON channels.channel_id=channel_members.channel_id WHERE channel_members.user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
	return JSON.parse(JSON.stringify(rows));
}
exports.selectNew = async (user_id, q) => {
	//let query = `SELECT * FROM channels WHERE channel_name LIKE '${q}%' OR title LIKE '${q}%'`;
	let query = `SELECT channels.channel_id,channels.channel_name,channels.title,channels.extension FROM channels INNER JOIN channel_members ON channels.channel_id=channel_members.channel_id WHERE (channels.channel_name LIKE '${q}%' OR channels.title LIKE '${q}%') AND channel_members.user_id!=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
	return JSON.parse(JSON.stringify(rows));
}
exports.insertNew = async (user_id, channel_name, title) => {
	let query = `INSERT INTO channels(channel_name,title,user_id) VALUES('${channel_name}','${title}',${user_id})`;
	let rows = await db.query(query).catch(err => { throw err });
	return rows.insertId;
}
exports.selectMembers = async (channel_id) => {
	let query = `SELECT users.user_id,users.user_name,users.first_name,users.last_name,users.extension,channel_member.member_type FROM users INNER JOIN channel_members ON users.user_id=channel_members.user_id WHERE channel_members.channel_id=${channel_id}`;
	let rows = await db.query(query).catch(err => { throw err });
	return JSON.parse(JSON.stringify(rows));
}
exports.insertMember = async (channel_id, user_id, member_type) => {
	let query = `INSERT INTO channel_members(channel_id,user_id,member_type) VALUES('${channel_id}',${user_id},${member_type})`;
	let rows = await db.query(query).catch(err => { throw err });
	return "success";
}
exports.updateMemberType = async (channel_id, user_id, member_type) => {
	let query = `UPDATE channel_members SET member_type=${member_type} WHERE channel_id=${channel_id} AND user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
	return "success";
}
exports.deleteMember = async (channel_id, user_id) => {
	let query = `DELETE FROM channel_members WHERE channel_id=${channel_id} AND user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
	return "success";
}
exports.selectPreviousMedia = async (channel_id, row_up) => {
	//let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id>${row_up} LIMIT ${limit}`;
	let query = `SELECT * FROM channel_media WHERE channel_id=${channel_id} AND channel_media_id<=${row_up}`;
	let rows = await db.query(query).catch(err => { throw err });
	console.log(rows);

	let limit = config.limit;
	if (rows.length < limit) {
		limit = rows.length;
	}
	console.log(limit);
	
	return rows.splice(rows.length - limit, limit);
}
exports.countPreviousMedia = async () => {
	let query = `SELECT COUNT(*) FROM channel_media`;
	let rows = await db.query(query).catch(err => { throw err });
	return rows[0]['COUNT(*)'];
}
exports.insertMediaMessage = async (channel_id, user_id, encrypted_message) => {
	let query = `INSERT INTO channel_media(channel_id,user_id,media_type,text) VALUES(${channel_id},${user_id},0,'${encrypted_message}')`;
	let rows = await db.query(query).catch(err => { throw err });
	return rows.insertId;
}
