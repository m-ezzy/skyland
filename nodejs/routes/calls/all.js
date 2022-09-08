let express = require("express");
let router = express.Router();

router.use('/load', require('./load'));
router.use('/make_new_call', require('./make_new_call'));
router.use('/send_my_peer_id', require('./send_my_peer_id'));

module.exports = router;
