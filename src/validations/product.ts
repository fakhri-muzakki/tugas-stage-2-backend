import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).allow(null, ''),
  price: Joi.string().min(1).max(50).allow(null, ''),
  stock: Joi.string().min(1).max(50).allow(null, ''),
});

export const uploadImageSchema = Joi.object({
  productId: Joi.string().required(),
});
