import express from 'express';
import { body } from 'express-validator';
import { createWilaya, getWilayas } from '../controllers/wilayaController.js';
import { allowRoles, authRequired } from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', getWilayas);
router.post('/', authRequired, allowRoles('admin'), [body('name').notEmpty(), body('description').notEmpty()], validate, createWilaya);

export default router;
