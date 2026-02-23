import express from 'express';
import { body } from 'express-validator';
import { createBusiness, listBusinesses, listOwnerReservations, updateBusiness } from '../controllers/businessController.js';
import { allowRoles, authRequired } from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', listBusinesses);
router.post('/', authRequired, allowRoles('business_owner'), [body('name').notEmpty(), body('type').isIn(['hotel', 'restaurant']), body('wilayaId').isInt()], validate, createBusiness);
router.put('/:id', authRequired, allowRoles('business_owner', 'admin'), updateBusiness);
router.get('/owner/reservations', authRequired, allowRoles('business_owner'), listOwnerReservations);

export default router;
