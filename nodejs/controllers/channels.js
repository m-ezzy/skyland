let models = {
	channels: require("../models/channels"),
}

let channels = {};

channels.load = async (req, res) => {
	res.render('channels', {'data': ''}, (err, html) => {
		res.contentType('text/json')
		res.send({'json': '', 'html': html})
	})
}
channels.get_previous = async (req, res) => {
	let user_id = req.cookies.user_id;

	let rows = await models.channels.selectPrevious(user_id);
	let row_num = await models.channels.countPreviousMedia();

	let p = {};
	for (let i = 0 ; i < rows.length ; i++) {
		let r = rows[i];
		p[r.channel_id] = {'channel_name': r.channel_name, 'title': r.title, 'extension': r.extension, 'row_up': row_num, 'row_down': row_num, 'members': {}};

		let rows3 = await models.channels.selectMembers(r.channel_id);

		for (let j=0 ; j<rows3.length ; j++) {
			let m = rows3[j];
			p[r.channel_id]['members'][m.user_id] = {'user_name': m.user_name, 'first_name': m.first_name, 'last_name': m.last_name, 'extension': m.extension, 'member_type': m.member_type};
		}
	}
	res.contentType('text/json')
	res.send({'json': p, 'html': ''})
}
channels.search_new = async (req, res) => {
	let rows = await models.channels.selectNew(req.cookies.user_id, req.body.q);

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(rows)));
}
channels.create_new = async (req, res) => {
	let channel_id = await models.channels.insertNew(req.cookies.user_id, req.body.channel_name);
	await models.groups.insertMember(channel_id, req.cookies.user_id, 1);
	let row_num = await models.channels.countPreviousMedia();

	let value = {
		'channel_name': req.body.channel_name, 
		'title': null, 
		'extension': null, 
		'row_up': 0, 
		'row_down': row_num, 
		'members': {
			user_id: {}
		}
	};
	res.contentType('text/json');
	res.send(JSON.stringify({'channel_id': channel_id, 'value': value}));
}
channels.join = async (req, res) => {
	await models.channels.insertMember(req.body.channel_id, req.cookies.user_id, 3);

	res.contentType('text/json');
	res.send({'result': 1});
}
channels.promote_demote_user = async (req, res) => {
	await models.channels.updateMemberType(req.body.channel_id, req.body.user_id, req.body.member_type);

	res.contentType('text/json');
	res.send(JSON.stringify({"result": "success"}));
}
channels.leave = async (req, res) => {
	await models.channels.deleteMember(req.body.channel_id, req.cookies.user_id);
	res.json({"result": "success"});
}
channels.history_conv = async (req, res) => {
	let rows = await models.channels.selectPreviousMedia(req.body.channel_id, req.body.row_up);

	res.contentType('text/json');
	res.send(JSON.parse(JSON.stringify(rows)));
}
channels.send_message = async (req, res) => {
	let channel_media_id = await models.channels.insertMediaMessage(req.body.channel_id, req.cookies.user_id, req.body.encrypted_message);
	
	res.contentType('text/json');
	res.send(JSON.stringify({'channel_media_id': channel_media_id}));
}

module.exports = channels;
