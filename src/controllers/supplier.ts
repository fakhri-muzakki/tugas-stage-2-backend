import { type Request, type Response, type NextFunction } from 'express';
import type { InventoryType } from '../types';
import { addStockService, updateStockService } from '../services/supplier';
import prisma from '../libs/prisma';
import { compare, hash } from 'bcrypt';
import env from '../configs/env';
import jwt from 'jsonwebtoken';

interface StockBody {
  productId: string;
  quantity: string;
  type: InventoryType;
}

export const addStock = async (
  req: Request<object, object, StockBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity, type } = req.body;
    const supplierId = req.user?.id;

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

export const updateStock = async (
  req: Request<object, object, StockBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity } = req.body;
    const supplierId = req.user?.id;

    await updateStockService(
      Number(productId),
      Number(supplierId),
      Number(quantity)
    );

    return res.status(200).json({
      success: true,
      message: 'Update stock successfully',
      // data,
    });
  } catch (error) {
    next(error);
  }
};

interface Supplier {
  name: string;
  email: string;
  password: string;
}

export const register = async (
  req: Request<object, object, Supplier>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await hash(password, 10);

    const data = await prisma.supplier.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
      omit: { password: true },
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
  req: Request<object, object, Supplier>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const supplier = await prisma.supplier.findFirst({ where: { email } });
    if (!supplier) {
      throw new Error('User not found');
    }

    const isMatch = await compare(password, supplier.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const accessTokenExpired = env.accessTokenExpired;

    const accessToken = jwt.sign(
      {
        id: supplier.id,
        name: supplier.name,
      },
      env.accessTokenSecret,
      {
        expiresIn: accessTokenExpired,
      }
    );

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15, // 15 menit
    });

    return res.status(200).json({
      success: true,
      message: 'Login successfully',
      accessToken,
      data: {
        id: supplier.id,
        name: supplier.name,
        email: supplier.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
