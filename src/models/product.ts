interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  stock: number;
}

export let products: Product[] = [
  {
    id: 1,
    title: 'Nabati',
    price: 1_000,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    stock: 100,
  },
  {
    id: 2,
    title: 'Bengbeng',
    price: 2_000,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    stock: 100,
  },
  {
    id: 3,
    title: 'Oreo',
    price: 2_000,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    stock: 100,
  },
];

export const deleteProductById = (id: number) => {
  products = products.filter((product) => product.id !== id);
};

export const updateProductById = (id: number, editProduct: Product) => {
  products = products.map((product) =>
    product.id === id ? { ...product, ...editProduct } : product
  );
};
