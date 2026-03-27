import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../libs/prisma';
import { AppError } from '../errors/AppError';
import { saveToDisk } from '../utils/saveFile';

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
    const body = req.body;
    const data = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    return res.status(200).json({
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
      message: 'User deteled successfully',
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
    const body = req.body;
    const data = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
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

export const uploadProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body; // sudah divalidasi middleware validate()

    // Validasi file
    if (!req.file) {
      throw new AppError('Image is required', 400);
    }

    // Semua validasi lolos — baru simpan ke disk
    const originalname = req.file.originalname;
    const filename = `${Date.now()}-${originalname.replace(/\s+/g, '-')}`;

    const data = await prisma.user.update({
      where: { id: Number(userId) },
      data: { profile: filename },
      omit: { password: true },
    });

    saveToDisk(req.file.buffer, filename);

    return res.status(200).json({
      success: true,
      message: 'Uploaded image successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
