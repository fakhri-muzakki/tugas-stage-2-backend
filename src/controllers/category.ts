import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../libs/prisma';

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.category.findMany();

    return res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request<object, object, { name: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const data = await prisma.category.create({
      data: {
        name: name,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Category created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request<{ id: string }, object, { name: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const data = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
