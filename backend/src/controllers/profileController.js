import { HouseRental, User } from '../models/index.js';

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    await user.update(req.body);
    return res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    return next(err);
  }
};

export const createHouseRental = async (req, res, next) => {
  try {
    const rental = await HouseRental.create({ ...req.body, userId: req.user.id });
    return res.status(201).json(rental);
  } catch (err) {
    return next(err);
  }
};
