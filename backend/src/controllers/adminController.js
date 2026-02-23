import { Business, Landmark, User, Wilaya } from '../models/index.js';

export const manageUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

export const approveBusiness = async (req, res, next) => {
  try {
    const business = await Business.findByPk(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    await business.update({ isApproved: true });
    return res.json(business);
  } catch (err) {
    return next(err);
  }
};

export const deleteLandmark = async (req, res, next) => {
  try {
    const landmark = await Landmark.findByPk(req.params.id);
    if (!landmark) return res.status(404).json({ message: 'Landmark not found' });
    await landmark.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

export const createLandmark = async (req, res, next) => {
  try {
    const landmark = await Landmark.create(req.body);
    return res.status(201).json(landmark);
  } catch (err) {
    return next(err);
  }
};

export const updateWilaya = async (req, res, next) => {
  try {
    const wilaya = await Wilaya.findByPk(req.params.id);
    if (!wilaya) return res.status(404).json({ message: 'Wilaya not found' });
    await wilaya.update(req.body);
    return res.json(wilaya);
  } catch (err) {
    return next(err);
  }
};
