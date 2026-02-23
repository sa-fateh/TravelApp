import { Landmark, Wilaya } from '../models/index.js';

export const getWilayas = async (req, res, next) => {
  try {
    const wilayas = await Wilaya.findAll({ include: [Landmark], order: [['name', 'ASC']] });
    return res.json(wilayas);
  } catch (err) {
    return next(err);
  }
};

export const createWilaya = async (req, res, next) => {
  try {
    const wilaya = await Wilaya.create(req.body);
    return res.status(201).json(wilaya);
  } catch (err) {
    return next(err);
  }
};
