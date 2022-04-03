const {Router} = require('express');
const router = Router();

const loginController = require('../controllers/login.controller');

router.get('/', loginController.renderLogin);

module.exports = router;