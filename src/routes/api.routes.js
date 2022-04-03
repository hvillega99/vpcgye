const {Router} = require('express');
const router = Router();

const apiController = require('../controllers/api.controller');

router.get('/actividades/:idActividad', apiController.getActividad);

module.exports = router;