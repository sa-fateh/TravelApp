import express from 'express';
import { body } from 'express-validator';
import { createHouseRental, updateProfile } from '../controllers/profileController.js';
import { allowRoles, authRequired } from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.put('/', authRequired, updateProfile);
router.post('/house-rentals', authRequired, allowRoles('user'), [body('address').notEmpty(), body('price').isDecimal(), body('contact').notEmpty(), body('description').notEmpty()], validate, createHouseRental);

export default router;
