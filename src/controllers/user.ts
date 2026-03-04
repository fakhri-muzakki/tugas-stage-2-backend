import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../libs/prisma';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.user.findMany();

    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (
  req: Request<object, object, UserRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const data = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request<{ id: string }, object, Partial<UserRequest>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const data = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
