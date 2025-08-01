const express = require('express')
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/casos', casosController.getAllCasos);
router.get('/casos/:id', casosController.getCasoId);

router.post('/casos', casosController.postCaso);

router.put('/casos/:id', casosController.putCaso);

router.patch('/casos/:id', casosController.patchCaso);

router.delete('/casos/:id', casosController.deleteCaso);



module.exports = router