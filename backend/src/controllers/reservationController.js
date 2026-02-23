import { Business, Reservation } from '../models/index.js';

export const createReservation = async (req, res, next) => {
  try {
    const business = await Business.findByPk(req.body.businessId);
    if (!business || !business.isApproved) return res.status(404).json({ message: 'Business not found' });
    const reservation = await Reservation.create({ ...req.body, userId: req.user.id });
    return res.status(201).json(reservation);
  } catch (err) {
    return next(err);
  }
};

export const myReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({ where: { userId: req.user.id }, include: [Business] });
    return res.json(reservations);
  } catch (err) {
    return next(err);
  }
};
