import express from 'express';
import { body } from 'express-validator';
import { createReservation, myReservations } from '../controllers/reservationController.js';
import { allowRoles, authRequired } from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/me', authRequired, allowRoles('user'), myReservations);
router.post('/', authRequired, allowRoles('user'), [body('date').isISO8601(), body('businessId').isInt()], validate, createReservation);

export default router;
