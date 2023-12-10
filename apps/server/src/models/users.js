import { execute_query } from '../database.js'

const usersModel = {}

//select
usersModel.select_from_user_name_and_pass_word = async (user_name, pass_word) => { //check_pass_word
	let query = `SELECT * FROM users WHERE user_name='${user_name}' AND pass_word='${pass_word}'`
	let rows = await execute_query(query)
	return rows[0]
}
usersModel.select = async (user_id) => {
	let query = `SELECT * FROM users WHERE user_id=${user_id}`
	let rows = await execute_query(query)
	return rows[0]
}
usersModel.select_from_user_name = async (user_name) => { //check_user_name //select_from_user_name
	let query = `SELECT * FROM users WHERE user_name='${user_name}'`
	let rows = await execute_query(query)
	return rows[0]
}
usersModel.select_basic = async (user_id) => {
	let query = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_id=${user_id}`
	let rows = await execute_query(query)
	return rows[0]
}
usersModel.select_basic_from_user_name = async (user_name) => {
	let query = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_name='${user_name}'`
	let rows = await execute_query(query)
	return rows[0]
}

//insert
usersModel.insert = async (user_name, pass_word, first_name, last_name) => {
	let query = `INSERT INTO users(user_name,pass_word,first_name,last_name) VALUES('${user_name}','${pass_word}','${first_name}','${last_name}')`
	let rows = await execute_query(query)
	return rows.insertId
}

//update
usersModel.update = async (user_id, s) => {
	let query = `UPDATE users SET ${s} WHERE user_id=${user_id}`;
	let rows = await execute_query(query)
	return "success"
}

//delete
usersModel.delete = async (user_id) => {
	let query = `DELETE FROM users WHERE user_id=${user_id}`
	let rows = await execute_query(query)
	return "success"
}

export default usersModel
