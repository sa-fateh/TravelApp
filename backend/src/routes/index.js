import express from 'express';
import adminRoutes from './adminRoutes.js';
import authRoutes from './authRoutes.js';
import businessRoutes from './businessRoutes.js';
import profileRoutes from './profileRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import transportRoutes from './transportRoutes.js';
import wilayaRoutes from './wilayaRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/wilayas', wilayaRoutes);
router.use('/businesses', businessRoutes);
router.use('/reservations', reservationRoutes);
router.use('/reviews', reviewRoutes);
router.use('/profile', profileRoutes);
router.use('/transport', transportRoutes);
router.use('/admin', adminRoutes);

export default router;
