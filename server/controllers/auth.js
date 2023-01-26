import usersModel from "../models/users.js"

export const sign_up_load = async (req, res) => {
	res.render('auth/sign_up', {data: ''}, (err, html) => {
		res.send({html: html})
	})
}
export const log_in_load = async (req, res) => {
	/*fs.readFileSync(process.cwd() + "\\server\\views\\log_in.html", (err, content) => {
		res.json({html: content})
	})*/

	// res.sendFile(process.cwd() + "\\server\\views\\log_in.html")
	
	res.render('auth/log_in', {data: ''}, (err, html) => {
		res.send({html: html})
	})
}
export const sign_up = async (req, res) => {
	let rows = await usersModel.check_user_name(req.body.user_name)
	if(rows.length) {
		res.json({status: 'username is not available'})
	} else {
		let user_id = await usersModel.insert(req.body.user_name, req.body.pass_word, req.body.first_name, req.body.last_name)

		//creating chat between itself
		await chatsModel.insert(user_id, user_id)

		res.cookie('user_id', user_id, {maxAge: '360000000'})
		// res.cookie('user_name', req.body.user_name, {maxAge: '360000000'})
		res.redirect('/')
		// res.json({user_id: user_id, user_name: req.body.username})
	}
}
export const log_in = async (req, res) => {
	let rows = await usersModel.check_pass_word(req.body.user_name, req.body.pass_word)
	if (rows.length == 0) {
		res.json({
			status: 'failure',
			reason: 'username is not registered'
		})
	} else {
		res.cookie('user_id', rows[0].user_id, {maxAge: '360000000'})
		// res.cookie('username', rows[0].user_name, {maxAge: '360000000'})
		// res.redirect('/')
		res.send({status: 'success'})
	}
}
