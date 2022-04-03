const {Router} = require('express');
const router = Router();

const homeController = require('../controllers/admin.controller');

router.get('/', homeController.renderAdminView);
router.post('/', homeController.saveActividad);

router.get('/delete/actividad/:id', homeController.deleteActividad);

router.get('/edit/actividad/:id', homeController.renderEditActividad);
router.post('/edit/actividad/:id', homeController.editActividad);

router.get('/voluntarios', homeController.renderVoluntarios);
router.post('/voluntarios', homeController.saveVoluntario);

router.get('/delete/voluntario/:id', homeController.deleteVoluntario);

router.get('/edit/voluntario/:id', homeController.renderEditVoluntario);
router.post('/edit/voluntario/:id', homeController.editVoluntario);

module.exports = router;