export interface Product {
  id: number,
  name: string,
  price: number,
};

export interface Purchase {
  product: Product,
  count: number,
};
