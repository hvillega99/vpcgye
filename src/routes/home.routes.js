const {Router} = require('express');
const router = Router();

const homeController = require('../controllers/home.controller');

router.get('/', homeController.renderHome);
router.get('/perfil', homeController.renderProfile);
router.post('/perfil/:ci', homeController.updateProfile);

module.exports = router;