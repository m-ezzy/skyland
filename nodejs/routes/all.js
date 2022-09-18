let express = require("express");
let router = express.Router();

//router.use('/data/icons/users', require('./get_data_image'));

router.get("/", (req, res) => {
	if (req.cookies.user_id) {
		res.redirect(`localhost:8000/index.html`);
		//res.redirect(`../../public/index.html`);
		//res.contentType('text/html');
		//res.sendFile(`C:/xampp/htdocs/all/nodejs/expressjs/skyland-nodejs/index.html`);
	} else {
		//res.contentType('text/html');
		//res.redirect(`../public/authentication.html`);
		res.redirect(`localhost:8000/auth.html`);
		//res.redirect(`C:/xampp/htdocs/all/nodejs/expressjs/skyland-nodejs/public/authentication.html`);
	}
});

router.use('/auth', require('./auth/all'));
router.use('/calls', require('./calls/all'));
router.use('/chats', require('./chats/all'));
router.use('/groups', require('./groups/all'));
router.use('/channels', require('./channels/all'));
//router.use('/games', require('.//all'));
router.use('/settings', require('./settings/all'));

module.exports = router;
