import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../libs/prisma';
import { type OrderItem } from '../types';
import {
  createOrderService,
  getOrdersSummaryService,
  updateOrderService,
} from '../services/order';

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.order.findMany();

    return res.status(200).json({
      success: true,
      message: 'Order retrieved successfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

interface OrderRequest {
  userId: string;
  items: OrderItem[];
}

export const createOrder = async (
  req: Request<object, object, OrderRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, items } = req.body;
    const order = await createOrderService(userId, items);

    return res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: {
        id: order.id,
        total: order.total,
        items,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request<{ id: string }, object, Pick<OrderRequest, 'items'>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await updateOrderService(Number(id), body.items);

    return res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersSummary = async (
  req: Request<object, object, object, { page: string; limit: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const data = await getOrdersSummaryService(limit, skip);

    return res.status(200).json({
      success: true,
      message: 'Order summary fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
