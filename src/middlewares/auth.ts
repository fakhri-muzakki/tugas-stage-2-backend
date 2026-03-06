import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../types/index';
import env from '../configs/env';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const accessTokenSecret = env.accessTokenSecret;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'you must include a token',
      });
    }

    const decoded = jwt.verify(token, accessTokenSecret);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
