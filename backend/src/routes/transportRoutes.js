import express from 'express';
import { body } from 'express-validator';
import { createTransportService, listTransportServices, updateTransportService } from '../controllers/transportController.js';
import { allowRoles, authRequired } from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', listTransportServices);
router.post('/', authRequired, allowRoles('tourist_agency'), [body('name').notEmpty(), body('contact').notEmpty(), body('services').notEmpty()], validate, createTransportService);
router.put('/:id', authRequired, allowRoles('tourist_agency', 'admin'), updateTransportService);

export default router;
