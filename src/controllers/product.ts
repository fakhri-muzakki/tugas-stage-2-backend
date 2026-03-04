import { type NextFunction, type Request, type Response } from 'express';
import prisma from '../libs/prisma';

interface GetProductsQuery {
  page: string;
  limit: string;
  sort: 'desc' | 'asc';
  gte: string;
  lte: string;
}

export const getProducts = async (
  req: Request<object, object, object, GetProductsQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const sort = req.query.sort === 'asc' ? 'asc' : 'desc';
    const gte = req.query.gte ? Number(req.query.gte) : undefined;
    const lte = req.query.lte ? Number(req.query.lte) : undefined;
    const skip = (page - 1) * limit;

    const [products, totalData] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        where: {
          price: {
            gte,
            lte,
          },
        },
        orderBy: {
          createdAt: sort,
        },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalData / limit);

    return res.status(200).json({
      success: true,
      message: 'Products fetched successfully.',
      data: products,
      meta: {
        page,
        limit,
        totalData,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

interface ProductRequest {
  name: string;
  price: string;
  stock: string;
}

export const createProduct = async (
  req: Request<object, object, ProductRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;
    const data = await prisma.product.create({
      data: {
        name: product.name,
        price: parseFloat(product.price),
        stock: Number(product.stock),
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

export const updateProduct = async (
  req: Request<{ id: string }, object, Partial<ProductRequest>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const price = product.price ? parseFloat(product.price) : undefined;
    const stock = product.stock ? Number(product.stock) : undefined;

    const data = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: product.name,
        price,
        stock,
      },
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
