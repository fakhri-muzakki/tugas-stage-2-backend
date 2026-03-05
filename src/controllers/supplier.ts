import { type Request, type Response, type NextFunction } from 'express';
import type { InventoryType } from '../types';
import { addStockService } from '../services/supplier';

interface AddStockBody {
  productId: string;
  supplierId: string;
  quantity: string;
  type: InventoryType;
}

export const addStock = async (
  req: Request<object, object, AddStockBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, supplierId, quantity, type } = req.body;
    const result = await addStockService(
      Number(productId),
      Number(supplierId),
      Number(quantity),
      type
    );

    return res.status(200).json({
      success: true,
      message: 'Stock added successfully',
      // data: {
      //   movementId: result.movement.id,
      //   productId: result.product.id,
      //   productName: result.product.name,
      //   addedQuantity: Number(quantity),
      //   currentStock: result.product.stock,
      //   type,
      // },
    });
  } catch (error) {
    next(error);
  }
};
