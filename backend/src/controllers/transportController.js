import { TransportAgency } from '../models/index.js';

export const listTransportServices = async (req, res, next) => {
  try {
    const agencies = await TransportAgency.findAll();
    return res.json(agencies);
  } catch (err) {
    return next(err);
  }
};

export const createTransportService = async (req, res, next) => {
  try {
    const agency = await TransportAgency.create({ ...req.body, ownerId: req.user.id });
    return res.status(201).json(agency);
  } catch (err) {
    return next(err);
  }
};

export const updateTransportService = async (req, res, next) => {
  try {
    const agency = await TransportAgency.findByPk(req.params.id);
    if (!agency) return res.status(404).json({ message: 'Agency not found' });
    if (agency.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await agency.update(req.body);
    return res.json(agency);
  } catch (err) {
    return next(err);
  }
};
