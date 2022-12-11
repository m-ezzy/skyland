var mysql = require('mysql');
const util = require( 'util' );


let server_name = "localhost";
let server_user_name = "root";
let server_pass_word = "";
let data_base = "skyland";

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

var db = mysql.createConnection({
	//socketPath: socketPath,
	host: server_name,
	user: server_user_name,
	password: server_pass_word,
	database: data_base,
	//port: 80,
});

// promise wrapper to enable async await with MYSQL
db.query = util.promisify(db.query).bind(db);

// connect to the database
db.connect(function(err) {
	if (err) {
		console.log("error connecting: " + err.stack);
		return;
	};
	console.log("connected as... " + db.threadId);
});

module.exports = db;
//module.exports.limit = 5;
/*
let executeQuery = async (query) => {
	let rows = await db.query(query)
        .catch(err => {
            console.log(err)
            throw err
        }
    )
	return JSON.parse(JSON.stringify(rows))
}
exports.default = {}
*/
