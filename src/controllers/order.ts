import { type Request, type Response, type NextFunction } from 'express';
import { deleteOrderById, orders, updateOrderById } from '../models/order';
import { products } from '../models/product';

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = orders;

    return res.status(200).json({
      success: true,
      message: 'All orders successfully acquired.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = req.body;
    const id = orders.length + 1;
    const product = products.find((p) => p.id === Number(order.productId));

    if (!product) {
      throw new Error('Product not found');
    }

    const data = {
      id,
      ...order,
      status: 'PENDING',
      totalPrice: product.price * order.quantity,
    };
    orders.push(data);

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    deleteOrderById(Number(id));

    return res.status(200).json({
      success: true,
      message: 'product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = req.body;

    // if (products.find((product) => product.id === Number(id))) {
    //   throw new Error('product tidak ditemukan');
    // }
    updateOrderById(Number(id), order);

    return res.status(200).json({
      success: true,
      message: 'order updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
