const router = require('express').Router();
const controller = require('../controllers');

/* GET home page. */
router.get('/', controller.home);

router.use(controller.notFound);
router.use(controller.exception);

const dashboard = require('./dashboard');
router.use('/dashboard', dashboard);

module.exports = router;
