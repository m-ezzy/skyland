let express = require("express");
let router = express.Router();

router.use('/log_in', require('./log_in'));
router.use('/sign_up', require('./sign_up'));
router.use('/user_name_is_registered', require('./user_name_is_registered'));

module.exports = router;
