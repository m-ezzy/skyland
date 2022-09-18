let express = require("express");
let router = express.Router();
/*
router.get("/", async (req, res) => {
	res.cookies('content_current', 'chats');
	res.redirect('/auth');
});*/

router.use('/load', require('./load'));
router.use('/search_new', require('./search_new'));
router.use('/create_new', require('./create_new'));
router.use('/history_conv', require('./history_conv'));
router.use('/send_message', require('./send_message'));

router.use("/", (req, res) => {
	res.contentType('text/html');
	res.send("<h1> 404 page not found <h1>");
});

module.exports = router;
