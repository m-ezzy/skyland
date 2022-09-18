let express = require("express");
let router = express.Router();
/*
router.get("/", async (req, res) => {
	res.redirect('/auth');
});*/

router.use('/load', require('./load'));
//router.use('/search', require('./search'));
//router.use('/create_new', require('./create_new'));
//router.use('/show_conversation', require('./show_conversation'));
//router.use('/send_message', require('./send_message'));

module.exports = router;
