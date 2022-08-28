let express = require("express");
let router = express.Router();
let db = require('../database.js');

let path = require("path");

router.post("/", async (req, res) => {
	let user_id = req.cookies.user_id;

	let a = [];

	let query = `SELECT groups.id,groups.name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.id=group_members.group_id WHERE group_members.user_id=${user_id}`;
	let rows = await db.query(query).catch(err => { throw err });

	let query2 = `SELECT COUNT(*) FROM group_media`;
	let rows2 = await db.query(query2).catch(err => { throw err });
	let row_num = rows2[0]['COUNT(*)'];

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(a)));

	/*
	$rows = array();
	while($row = $result->fetch_object()) {
		$_SESSION['groups']['group_name'][] = $row->group_name;
		$rows[] = $row;
	}

	if(count($rows)) {
		$json = json_encode($rows);
		echo $json;
	} else {
		echo "0";
	}

	$i = 0;
	while($i < count($_SESSION['groups']['group_name'])) {
		$gn = $_SESSION['groups']['group_name'][$i];

		$query = "SELECT COUNT(*) FROM group_messages_$gn";
		$result = $conn->query($query);

		$r = $result->fetch_all();
		//print_r($r);

		$_SESSION['groups']['row_up'][] = $r[0][0];
		$_SESSION['groups']['row_down'][] = $r[0][0];

		$i++;
	}	
?>
