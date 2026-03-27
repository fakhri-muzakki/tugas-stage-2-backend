import Joi from 'joi';

export const uploadSchema = Joi.object({
  userId: Joi.string().required(),
});
