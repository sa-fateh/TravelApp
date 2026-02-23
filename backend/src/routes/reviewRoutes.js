import express from 'express';
import { body } from 'express-validator';
import { createReview, listReviews, respondToReview } from '../controllers/reviewController.js';
import { allowRoles, authRequired } from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', listReviews);
router.post('/', authRequired, allowRoles('user'), [body('rating').isInt({ min: 1, max: 5 }), body('comment').notEmpty(), body('businessId').isInt()], validate, createReview);
router.put('/:id/respond', authRequired, allowRoles('business_owner'), [body('response').notEmpty()], validate, respondToReview);

export default router;
