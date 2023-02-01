import mysql from 'mysql'

let options = {
	host: "localhost",
	user: "root",
	password: "",
	database: "online-chatting-application"
}
/*
$server_name = "sql302.epizy.com";
$server_user_name = "epiz_28162099";
$server_pass_word = "jBwVaUaBK0SKK";
$data_base = "epiz_28162099_skyland";
*/
/*
let server_name = "sql.freedb.tech";
let server_user_name = "freedb_jkhvcvnb";
let server_pass_word = "Ttkr?a**ugrP445";
let data_base = "freedb_skyland";
*/
/*
let server_name = "sql6.freemysqlhosting.net";
let server_user_name = "sql6513187";
let server_pass_word = "3SXQdjHs3I";
let data_base = "sql6513187";
*/
/*
let server_name = "remotemysql.com";
let server_user_name = "GmbQ2TG1CF";
let server_pass_word = "qDNomQOxm6";
let data_base = "GmbQ2TG1CF";
*/
/*
let socketPath = "/cloudsql/skyland-362206:us-central1:mysql-db-1";
let server_user_name = "admin1";
let server_pass_word = "r^hx81{F-%75&Naa";
let data_base = "skyland";
*/

const connect = async () => new Promise((resolve, reject) => {
  const connection = mysql.createConnection(options)
	connection.connect((error) => {
		if (error) {
      reject(error)
    } else {
			resolve(connection)
		}
  })
})
const execute_query = async (query) => new Promise(async (resolve, reject) => {
	const connection = await connect()
		connection.query(query, connection, (error, rows) => {
		if (error) {
			console.log(error)
			reject(error)
		} else {
			console.log(rows.length)
			resolve(JSON.parse(JSON.stringify(rows)))
		}
		connection.end()
	})
})

export { execute_query }
