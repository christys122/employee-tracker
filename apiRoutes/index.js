const express = require('express');
const router = express.Router();

router.use(require('./routes'));
// router.use(require('./departments'));
// router.use(require('./roles'));

module.exports = router;