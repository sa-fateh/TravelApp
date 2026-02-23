import { Business, Review, User } from '../models/index.js';

export const createReview = async (req, res, next) => {
  try {
    const business = await Business.findByPk(req.body.businessId);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    const review = await Review.create({ ...req.body, userId: req.user.id });
    return res.status(201).json(review);
  } catch (err) {
    return next(err);
  }
};

export const listReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: [Business, { model: User, attributes: ['id', 'name'] }] });
    return res.json(reviews);
  } catch (err) {
    return next(err);
  }
};

export const respondToReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, { include: [Business] });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.Business.ownerId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await review.update({ response: req.body.response });
    return res.json(review);
  } catch (err) {
    return next(err);
  }
};
