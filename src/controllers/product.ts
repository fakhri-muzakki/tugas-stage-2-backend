import { type NextFunction, type Request, type Response } from 'express';
import { deletePostById, posts } from '../models/post';
import prisma from '../libs/prisma';

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.product.findMany();

    return res.status(200).json({
      success: true,
      message: 'All posts successfully acquired.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;
    const data = await prisma.product.create({
      data: {
        name: product.name,
        price: parseFloat(product.price),
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

interface UpdateProductRequest extends Request {
  params: { id: string };
  body: {
    name?: string;
    price?: number;
  };
}

export const updateProduct = async (
  req: UpdateProductRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const data = await prisma.product.update({
      where: { id: Number(id) },
      data: product,
    });

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
