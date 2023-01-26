import express from 'express'

import authRouter from './auth.js'
import usersRouter from './users.js'
import callsRouter from './calls.js'
import chatsRouter from './chats.js'
import groupsRouter from './groups.js'
import channelsRouter from './channels.js'

let apiRouter = express.Router()
let allRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/calls', callsRouter)
apiRouter.use('/chats', chatsRouter)
apiRouter.use('/groups', groupsRouter)
apiRouter.use('/channels', channelsRouter)

allRouter.use('/api', apiRouter)

allRouter.get("/", (req, res) => {   //get //all
	res.contentType('text/html')
	console.log('555555555555555555555')

	if (req.cookies.user_id) {
		console.log('gggggggggggggggggggggggggggggggggggg', process.cwd())
		// res.redirect(`localhost:8000/index.html`);
		// res.redirect(`../../public/index.html`);
		//res.redirect(`C:/xampp/htdocs/all/nodejs/expressjs/skyland-nodejs/public/authentication.html`);
		// res.contentType('text/html');
		// res.sendFile(`C:/xampp/htdocs/all/nodejs/expressjs/skyland-nodejs/index.html`);
		// res.sendFile(path.resolve(__dirname, "../../public/index.html"))
		res.sendFile(process.cwd() + "\\server\\views\\index.html")
	} else {
		console.log('auth sign up or log in')
		res.sendFile(process.cwd() + "\\server\\views\\auth\\auth.html")
	}
})
/*
allRouter.get("/chats", (req, res) => {
	res.cookie('menu', 'chats', {maxAge: '3600000000000'})
	res.redirect("/")
})
allRouter.get("/groups", (req, res) => {
	res.cookie('menu', 'groups', {maxAge: '3600000000000'})
	res.redirect("/")
})*/
allRouter.get("/:menu/:conv/info", (req, res) => {
	let menu = null
	let conv = null
	let info = null
	
	console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", req.params.menu, req.params.conv)
	if(["chats", "groups", "channels"].includes(req.params.menu)) {
		menu = req.params.menu
		conv = req.params.conv
		info = 'true'
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", menu, conv, info)

		res.cookie('menu', menu, {maxAge: '36000000000'})
		res.cookie('conv', conv, {maxAge: '36000000000'})
		res.cookie('info', info, {maxAge: '36000000000'})
	}
	res.redirect('/')
})
allRouter.get("/:menu/:conv", (req, res) => {
	let menu = null
	let conv = null

	console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", req.params.menu, req.params.conv)
	if(["chats", "groups", "channels"].includes(req.params.menu)) {
		menu = req.params.menu
		conv = req.params.conv

		res.cookie('menu', menu, {maxAge: '36000000000'})
		res.cookie('conv', conv, {maxAge: '36000000000'})
		res.clearCookie('info')
	}
	res.redirect('/')
})
allRouter.get("/:menu", (req, res) => {
	let menu = null
	if(['log_in', 'sign_up', 'calls', 'chats', 'groups', 'channels', 'account'].includes(req.params.menu)) {
		console.log("ffffffffffffffffffffffffffffffffffffffff", req.params.menu, req.params.conv)
		menu = req.params.menu
		
		res.cookie('menu', menu, {maxAge: '36000000000'})
		res.clearCookie('conv')
		res.clearCookie('info')
	}/* else {
		menu = "chats"
	}*/
	res.redirect('/')
})
/*allRouter.get("/*", (req, res) => {
	// res.redirect('/')
	// res.redirect('/page_not_found')
	res.send("<h1> 404 page not found <h1>")
})*/

export default allRouter
