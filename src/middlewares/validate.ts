import { type ObjectSchema } from 'joi';
import { type Request, type Response, type NextFunction } from 'express';

type DataType = 'body' | 'query' | 'params';

export const validate =
  (schema: ObjectSchema, dataType: DataType) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const { error, value } = schema.validate(req[dataType], {
      abortEarly: false, // tampilkan semua error
      stripUnknown: true, // buang field liar (anti injection)
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((d) => d.message),
      });
    }

    req[dataType] = value;
    next();
  };
