let models = {
	groups: require("../models/groups"),
	users: require("../models/users")
}
let controllers = {
	groups: {},
}
/* OR */
let groups = {}
/* OR */
//exports.<functionName> = ..........

groups.load = async (req, res) => {
	res.render('groups', {'data': ''}, (err, html) => {
		res.contentType('text/json')
		res.send({'json': '', 'html': html})
	})
}
groups.get_previous = async (req, res) => {
	let user_id = req.cookies.user_id;

	let rows = await models.groups.selectPrevious(user_id);
	let row_num = await models.groups.countPreviousMedia();
	//console.log("joker ", rows)

	let p = {};
	for (let i = 0 ; i < rows.length ; i++) {
	//await rows.forEach(async (r) => {
		let r = rows[i];
		//console.log(r)

		p[r.group_id] = {'group_name': r.group_name, 'title': r.title, 'extension': r.extension, 'row_up': row_num, 'row_down': row_num, 'members': {}};

		let rows3 = await models.groups.selectMembers(r.group_id);
		console.log(rows3);

		for (let j=0 ; j<rows3.length ; j++) {
		//await rows3.forEach(m => {
		//Object.values(rows3).forEach(m => {
			let m = rows3[j];
			//console.log(m)
			p[r.group_id]['members'][m.user_id] = {'user_name': m.user_name, 'first_name': m.first_name, 'last_name': m.last_name, 'extension': m.extension};
		}
		//console.log(p)
	}
	res.contentType('text/json')
	res.send({'json': p, 'html': ''})
}
groups.search_create_new = async (req, res) => {
	let user_id = req.cookies.user_id;
	let q = req.body.q;

	let rows = await models.groups.selectSearchCreateNew(user_id, q);

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(rows)));
}
groups.create_new = async (req, res) => {
	let user_id = req.cookies.user_id;
	let group_name = req.body.group_name;
	let title = req.body.title;

	let group_id = await models.groups.insertNew(group_name, title, user_id);
	await models.groups.insertMember(group_id, user_id);
	let row_num = await models.groups.countPreviousMedia();
	let o = await models.users.selectUserInfoCalls(user_id);

	let value = {
		'group_name': group_name, 
		'title': title, 
		'extension': null, 
		'row_up': 0, 
		'row_down': row_num, 
		'members': {
			user_id: {...o}
		}
	};

	res.contentType('text/json');
	res.send(JSON.stringify({'group_id': group_id, 'value': value}));
}
groups.add_member = async (req, res) => {   //add_member //join
	let user_id = req.cookies.user_id;
	let group_id = req.body.group_id;
	let member_id = req.body.member_id;
	let rows = await models.groups.insertMember(group_id, member_id);
	res.contentType('text/json');
	res.send(JSON.stringify({'status': 'success'}));
}
groups.leave = async (req, res) => {
	let user_id = req.cookies.user_id
	let group_id = req.body.group_id
	let rows = await models.groups.deleteMember(group_id, user_id)
	res.contentType('text/json')
	res.send(JSON.stringify({'result': 1}))
}
groups.history_conv = async (req, res) => {
	let user_id = req.cookies.user_id
	let group_id = req.body.group_id
	let row_up = req.body.row_up
	let rows = await models.groups.selectPreviousMedia(group_id, row_up)
	res.contentType('text/json')
	res.send(JSON.parse(JSON.stringify(rows)))
}
groups.send_message = async (req, res) => {
	let user_id = req.cookies.user_id;
	let group_id = req.body.group_id;
	let encrypted_message = req.body.encrypted_message;

	let group_media_id = await models.groups.insertMediaMessage(group_id, user_id, encrypted_message);
	
	res.contentType('text/json');
	res.send(JSON.stringify({'group_media_id': group_media_id}));
}

module.exports = groups;
