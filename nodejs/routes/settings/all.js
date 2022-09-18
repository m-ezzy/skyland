let express = require("express");
let router = express.Router();

router.use('/load', require('./load'));
router.use('/upload_profile_picture', require('./upload_profile_picture'));
//router.use('/get_pp', require('./get_pp'));

module.exports = router;
