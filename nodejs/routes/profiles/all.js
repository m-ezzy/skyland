let express = require("express");
let router = express.Router();

router.use('/load', require('./load'));

module.exports = router;
