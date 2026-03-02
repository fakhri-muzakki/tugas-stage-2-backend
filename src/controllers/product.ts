import { type NextFunction, type Request, type Response } from 'express';
import {
  deleteProductById,
  products,
  updateProductById,
} from '../models/product';
import { deleteOrderByProductId } from '../models/order';

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = products;

    return res.status(200).json({
      success: true,
      message: 'All products successfully acquired.',
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
    const id = products.length + 1;
    const data = { id, ...product };
    products.push(data);

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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    deleteProductById(id);
    deleteOrderByProductId(id);

    return res.status(200).json({
      success: true,
      message: 'product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = req.body;

    // if (products.find((product) => product.id === Number(id))) {
    //   throw new Error('product tidak ditemukan');
    // }
    updateProductById(Number(id), product);

    return res.status(200).json({
      success: true,
      message: 'product updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
