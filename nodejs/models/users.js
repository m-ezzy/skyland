let db = require('../database.js');

exports.selectUserInfo = async (user_id) => {
    let query = `SELECT * FROM users WHERE user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
    return JSON.parse(JSON.stringify(rows[0]));
}
exports.selectUserInfoCalls = async (user_id) => {
    let query = `SELECT user_name,first_name,last_name,extension FROM users WHERE user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
    return JSON.parse(JSON.stringify(rows[0]));
}
exports.selectUserSearch = async (q) => {
    let query = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_name LIKE '${q}%' OR first_name LIKE '${q}%' OR last_name LIKE '${q}%'`;
	let rows = await db.query(query).catch(err => { throw err });
    return JSON.parse(JSON.stringify(rows));
}
exports.selectUserNameAvailable = async (q) => {
    let query = `SELECT user_name FROM users WHERE user_name='${q}'`;
	let rows = await db.query(query).catch(err => { console.log(err); });
    return (JSON.parse(JSON.stringify(rows)).length ? false : true);
    //return JSON.parse(JSON.stringify(rows));
}
exports.selectUserLogIn = async (user_name, pass_word) => {
    let query = `SELECT user_id,user_name,pass_word FROM users WHERE user_name='${user_name}' AND pass_word='${pass_word}'`;
	let rows = await db.query(query).catch(err => { throw err });
    console.log(JSON.parse(JSON.stringify(rows)));
    return JSON.parse(JSON.stringify(rows[0].user_id));
}
exports.insertNew = async (user_name, pass_word, first_name, last_name) => {
    let query = `INSERT INTO users(user_name,pass_word,first_name,last_name) VALUES('${user_name}','${pass_word}','${first_name}','${last_name}')`;
	let rows = await db.query(query).catch(err => { throw err });
    return rows.insertId;
}
exports.updateInfo = async (user_id, user_name, pass_word, first_name, last_name, e_mail, mobile, extension) => {
    let query = `UPDATE users SET user_name='${user_name}',pass_word='${pass_word}',first_name='${first_name}',last_name='${last_name}',e_mail='${e_mail}',mobile=${mobile},extension='${extension}' WHERE user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });
    return "success";
}
