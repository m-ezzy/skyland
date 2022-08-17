var mysql = require('mysql');
const util = require( 'util' );

/*
let server_name = "localhost";
let server_user_name = "root";
let server_pass_word = "";
let data_base = "skyland";
*/
/*
$server_name = "sql302.epizy.com";
$server_user_name = "epiz_28162099";
$server_pass_word = "jBwVaUaBK0SKK";
$data_base = "epiz_28162099_skyland";
*/

let server_name = "sql6.freemysqlhosting.net";
let server_user_name = "sql6513187";
let server_pass_word = "3SXQdjHs3I";
let data_base = "sql6513187";


var con = mysql.createConnection({
	host: server_name,
	user: server_user_name,
	password: server_pass_word,
	database: data_base,
    //port: 80,
});

// promise wrapper to enable async await with MYSQL
con.query = util.promisify(con.query).bind(con);

// connect to the database
con.connect(function(err){
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    };
    console.log("connected as... " + con.threadId);
});

module.exports = con;
//module.exports.limit = 5;
