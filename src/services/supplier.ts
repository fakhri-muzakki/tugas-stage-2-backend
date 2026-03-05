import { ERROR_CODES } from '../constants/errorCodes';
import { AppError } from '../errors/AppError';
import prisma from '../libs/prisma';
import type { InventoryType } from '../types';

export const addStockService = async (
  productId: number,
  supplierId: number,
  quantity: number,
  type: InventoryType
) => {
  if (Number(quantity) < 0) {
    throw new AppError(
      'Points must be greater than zero',
      400,
      ERROR_CODES.TRANSFER.INVALID_AMOUNT
    );
  }

  const [product, supplier] = await Promise.all([
    prisma.product.findUnique({ where: { id: Number(productId) } }),
    prisma.supplier.findUnique({ where: { id: Number(supplierId) } }),
  ]);

  if (!product || !supplier) {
    const notfound = product ? 'supplier' : 'product';
    throw new AppError(
      `${notfound} is not found`,
      404,
      `${notfound.toUpperCase}_NOT_FOUND`
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const movement = await tx.inventoryMovement.create({
      data: {
        product: {
          connect: { id: Number(productId) },
        },
        supplier: {
          connect: { id: Number(supplierId) },
        },
        quantity: Number(quantity),
        type,
      },
    });

    const product = await tx.product.updateMany({
      where: { id: Number(productId) },
      // select: {
      //   id: true,
      //   name: true,
      //   stock: true,
      // },
      data: {
        stock: {
          increment: Number(quantity),
        },
      },
    });

    return { movement, product };
  });
};
