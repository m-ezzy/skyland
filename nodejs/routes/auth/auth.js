let express = require("express");
let router = express.Router();
const path = require('path');

router.all("/", (req, res) => {
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
module.exports = router;
