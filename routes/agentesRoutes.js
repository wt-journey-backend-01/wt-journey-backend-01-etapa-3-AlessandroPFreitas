const express = require('express')
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/agentes', agentesController.getAllAgentes);
router.get('/agentes/:id', agentesController.getAgenteId);

router.post('/agentes', agentesController.postAgente);

router.put('/agentes/:id', agentesController.putAgente);

router.patch('/agentes/:id', agentesController.patchAgente);

router.delete('/agentes/:id', agentesController.deleteAgente)

module.exports = router