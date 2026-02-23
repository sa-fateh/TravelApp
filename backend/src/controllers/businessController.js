import { Op } from 'sequelize';
import { Business, Reservation, Review, User, Wilaya } from '../models/index.js';

export const listBusinesses = async (req, res, next) => {
  try {
    const { type, search } = req.query;
    const where = { isApproved: true };
    if (type) where.type = type;
    if (search) where.name = { [Op.iLike]: `%${search}%` };

    const businesses = await Business.findAll({ where, include: [Wilaya, { model: User, as: 'owner', attributes: ['id', 'name', 'email'] }, Review] });
    return res.json(businesses);
  } catch (err) {
    return next(err);
  }
};

export const createBusiness = async (req, res, next) => {
  try {
    const business = await Business.create({ ...req.body, ownerId: req.user.id, isApproved: false });
    return res.status(201).json(business);
  } catch (err) {
    return next(err);
  }
};

export const updateBusiness = async (req, res, next) => {
  try {
    const business = await Business.findByPk(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    if (business.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await business.update(req.body);
    return res.json(business);
  } catch (err) {
    return next(err);
  }
};

export const listOwnerReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: Business, where: { ownerId: req.user.id } },
        { model: User, attributes: ['id', 'name', 'email'] },
      ],
    });
    return res.json(reservations);
  } catch (err) {
    return next(err);
  }
};
