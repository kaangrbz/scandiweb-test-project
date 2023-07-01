export type ProductType = {
  sku: string;
  name: string;
  type: 'dvd' | 'book' | 'furniture';
  price: number;
  size?: number;
  weight?: number;
  width?: number;
  height?: number;
  length?: number;
};

export type AddProductForm = Required<ProductType>;
