interface Order {
  id: number;
  productId: number;
  quantity: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED';
  totalPrice: number;
}

export let orders: Order[] = [
  {
    id: 1,
    productId: 2,
    quantity: 10,
    status: 'PENDING',
    totalPrice: 20_000,
  },
  {
    id: 2,
    productId: 3,
    quantity: 10,
    status: 'PENDING',
    totalPrice: 20_000,
  },
];

export const deleteOrderById = (id: number) => {
  orders = orders.filter((order) => order.id !== id);
};

export const deleteOrderByProductId = (id: number) => {
  orders = orders.filter((order) => order.productId !== id);
};

export const updateOrderById = (id: number, editOrder: Order) => {
  orders = orders.map((order) =>
    order.id === id ? { ...order, ...editOrder } : order
  );
};
