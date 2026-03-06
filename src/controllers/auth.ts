import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../libs/prisma';
import { compare, hash } from 'bcrypt';
import env from '../configs/env';
import jwt from 'jsonwebtoken';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await hash(password, 10);
    const data = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
      omit: { password: true, role: true },
    });

    return res.status(200).json({
      success: true,
      message: 'Register successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const accessTokenExpired = env.accessTokenExpired;

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      env.accessTokenSecret,
      {
        expiresIn: accessTokenExpired,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successfully',
      accessToken,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
