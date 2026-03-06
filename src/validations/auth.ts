import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).allow(null, ''),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(8)
    .max(64)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
    .messages({
      'string.pattern.base':
        'Password harus mengandung huruf besar, huruf kecil, dan angka',
    })
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(8)
    .max(64)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
    .messages({
      'string.pattern.base':
        'Password harus mengandung huruf besar, huruf kecil, dan angka',
    })
    .required(),
});
