const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../../middleware/auth');
const supervisorController = require('../../controllers/admin/supervisorController');

router.use(auth, isAdmin);

router.get('/', supervisorController.getAllSupervisors);
router.post('/', supervisorController.createSupervisor);
router.get('/:id', supervisorController.getSupervisorById);
router.put('/:id', supervisorController.updateSupervisor);
router.delete('/:id', supervisorController.deleteSupervisor);

module.exports = router; 