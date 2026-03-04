import prisma from '../libs/prisma';
import type { OrderItem } from '../types';

export const createOrderService = async (
  userId: string,
  items: OrderItem[]
) => {
  const productIds = items.map((item) => Number(item.productId));

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  if (products.length !== productIds.length) {
    throw new Error('Ada product yang tidak ditemukan');
  }

  // 🔥 HITUNG TOTAL DI SINI
  const total = items.reduce((acc, item) => {
    const product = products.find((p) => p.id === Number(item.productId));

    if (!product) {
      throw new Error('Product tidak ditemukan');
    }

    return acc + Number(product.price) * Number(item.quantity);
  }, 0);

  // 🔥 CREATE ORDER + SIMPAN TOTAL
  const order = await prisma.order.create({
    data: {
      user: {
        connect: { id: Number(userId) },
      },
      total: total, // 👈 sekarang disimpan
      items: {
        create: items.map((item) => {
          const product = products.find(
            (p) => p.id === Number(item.productId)
          )!;

          return {
            product: {
              connect: { id: product.id },
            },
            quantity: Number(item.quantity),
            price: product.price, // snapshot
          };
        }),
      },
    },
    include: {
      items: true,
    },
  });

  return order; // total sudah ada di order.total
};

export const updateOrderService = async (
  orderId: number,
  items: OrderItem[]
) => {
  // 1. Ambil order
  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!existingOrder) {
    throw new Error('Order tidak ditemukan');
  }

  // 2. Ambil products
  const productIds = items.map((item) => Number(item.productId));

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));

  // 3. Hitung total baru
  const newTotal = items.reduce((acc, item) => {
    const product = productMap.get(Number(item.productId));

    if (!product) {
      throw new Error('Product tidak ditemukan');
    }

    return acc + Number(product.price) * Number(item.quantity);
  }, 0);

  // 4. Hapus items lama
  await prisma.orderItem.deleteMany({
    where: { orderId },
  });

  // 5. Update order + create items baru
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      total: newTotal,
      items: {
        create: items.map((item) => {
          const product = productMap.get(Number(item.productId))!;

          return {
            product: {
              connect: { id: product.id },
            },
            quantity: Number(item.quantity),
            price: product.price,
          };
        }),
      },
    },
    include: {
      items: true,
    },
  });

  return updatedOrder;
};

export const getOrdersSummaryService = async (limit: number, skip: number) => {
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    include: {
      orders: {
        select: {
          id: true,
          total: true,
          createdAt: true,
        },
      },
    },
  });

  return users.map((user) => {
    const totalOrders = user.orders.length;

    const totalAmount = user.orders.reduce((acc, order) => {
      return acc + Number(order.total);
    }, 0);

    return {
      userId: user.id,
      totalOrders,
      totalAmount,
      orders: user.orders.map((order) => ({
        id: order.id,
        total: Number(order.total),
        createdAt: order.createdAt,
      })),
    };
  });
};
