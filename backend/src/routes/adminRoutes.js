import express from 'express';
import { deleteUser, manageUsers, approveBusiness, deleteLandmark, createLandmark, updateWilaya } from '../controllers/adminController.js';
import { allowRoles, authRequired } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authRequired, allowRoles('admin'));
router.get('/users', manageUsers);
router.delete('/users/:id', deleteUser);
router.patch('/businesses/:id/approve', approveBusiness);
router.post('/landmarks', createLandmark);
router.delete('/landmarks/:id', deleteLandmark);
router.put('/wilayas/:id', updateWilaya);

export default router;
