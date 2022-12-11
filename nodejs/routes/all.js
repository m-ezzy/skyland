let express = require("express");
let router = express.Router();

let controllers = {
	chats: require('../controllers/chats.js'),
	groups: require('../controllers/groups.js')
}
/* OR */
let auth = require("../controllers/auth");
let account = require("../controllers/account");
let calls = require("../controllers/calls");
let chats = require("../controllers/chats");
let groups = require("../controllers/groups");
let channels = require("../controllers/channels");
/* OR */
const { send_message } = require("../controllers/chats");

//router.use('/data/icons/users', require('./get_data_image'));

router.get("/", (req, res) => {   //get //all
	if (req.cookies.user_id) {
		//res.redirect(`localhost:8000/index.html`);
		//res.redirect(`../../public/index.html`);
		//res.contentType('text/html');
		//res.sendFile(`C:/xampp/htdocs/all/nodejs/expressjs/skyland-nodejs/index.html`);
		res.sendFile(path.resolve(__dirname, "../../public/index.html"));
	} else {
		//res.contentType('text/html');
		//res.redirect(`../public/authentication.html`);
		//res.redirect(`localhost:8000/auth.html`);
		//res.redirect(`C:/xampp/htdocs/all/nodejs/expressjs/skyland-nodejs/public/authentication.html`);
		res.sendFile(path.resolve(__dirname, "../../public/auth.html"));
	}
});
/*
router.get("/", async (req, res) => {
	res.cookies('content_current', 'chats');
	res.redirect('/auth');
});
router.get("/", async (req, res) => {
	res.cookies('content_current', 'groups');
	res.redirect('/auth');
});
router.get("/", (req, res) => {
	res.redirect('/page_not_found');
});
*/

//account //auth //users
router.post("/auth/log_in", async (req, res) => auth.log_in(req, res))
router.post("/auth/sign_up", async (req, res) => auth.sign_up(req, res))

router.post("/account/load", async (req, res) => account.load(req, res))
router.post("/account/update_info", async (req, res) => account.update_info(req, res))
router.post("/account/upload_profile_picture", async (req, res) => account.upload_profile_picture(req, res))
router.post("/account/download_profile_picture", async (req, res) => account.download_profile_picture(req, res))
router.post("/account/user_name_available", async (req, res) => account.user_name_available(req, res))

router.post("/calls/load", async (req, res) => calls.load(req, res))
router.post("/calls/get_previous", async (req, res) => calls.get_previous(req, res))
router.post("/calls/make_call_chats", async (req, res) => calls.make_call_chats(req, res))
router.post("/calls/make_call_groups", async (req, res) => calls.make_call_groups(req, res))
router.post("/calls/change_call_length_chats", async (req, res) => calls.change_call_length_chats(req, res))
//router.post("/calls/change_call_length_groups", async (req, res) => calls.change_call_length_groups(req, res))

router.post("/chats/load", async (req, res) => chats.load(req, res))
router.post("/chats/get_previous", async (req, res) => chats.get_previous(req, res))
router.post("/chats/search_new", async (req, res) => chats.search_new(req, res))
router.post("/chats/create_new", async (req, res) => chats.create_new(req, res))
router.post("/chats/history_conv", async (req, res) => chats.history_conv(req, res))
router.post("/chats/send_message", async (req, res) => chats.send_message(req, res))
//router.post("/chats/send_images", async (req, res) => send_images(req, res))
//router.post("/chats/send_videos", async (req, res) => send_videos(req, res))
//router.post("/chats/check_for_new", async (req, res) => check_for_new(req, res))
//router.post("/chats/check_for_new_media", async (req, res) => check_for_new_media(req, res))
//router.post("/chats/update_delivered_seen", async (req, res) => update_delivered_seen(req, res))

router.post("/groups/load", async (req, res) => groups.load(req, res))
router.post("/groups/get_previous", async (req, res) => groups.get_previous(req, res))
router.post("/groups/search_create_new", async (req, res) => groups.search_create_new(req, res))
router.post("/groups/create_new", async (req, res) => groups.create_new(req, res))
router.post("/groups/history_conv", async (req, res) => groups.history_conv(req, res))
router.post("/groups/send_message", async (req, res) => groups.send_message(req, res))
router.post("/groups/add_member", async (req, res) => groups.add_member(req, res))   //add_member //join
router.post("/groups/leave", async (req, res) => groups.leave(req, res))
//router.post("/groups/request_to_join")

router.post("/channels/load", async (req, res) => channels.load(req, res))
router.post("/channels/get_previous", async (req, res) => channels.get_previous(req, res))
router.post("/channels/search_new", async (req, res) => channels.search_new(req, res))
router.post("/channels/create_new", async (req, res) => channels.create_new(req, res))
router.post("/channels/history_conv", async (req, res) => channels.history_conv(req, res))
router.post("/channels/send_message", async (req, res) => channels.send_message(req, res))
router.post("/channels/join", async (req, res) => channels.join(req, res))
router.post("/channels/leave", async (req, res) => channels.leave(req, res))
router.post("/channels/promote_demote_user", async (req, res) => channels.promote_demote_user(req, res))

/*
router.use('/auth', require('./auth'));
router.use('/calls', require('./calls'));
router.use('/chats', require('./chats'));
router.use('/groups', require('./groups'));
router.use('/channels', require('./channels'));
router.use('/account', require('./account'));
*/
/*
router.use('/auth', require('./auth/all'));
router.use('/calls', require('./calls/all'));
router.use('/chats', require('./chats/all'));
router.use('/groups', require('./groups/all'));
router.use('/channels', require('./channels/all'));
router.use('/account', require('./account/all')); //account //profiles //settings
*/

/* how to write an error page, what's the url and where to place this router */
router.post("/", (req, res) => {
	res.contentType('text/html');
	res.send("<h1> 404 page not found <h1>");
});

module.exports = router;
