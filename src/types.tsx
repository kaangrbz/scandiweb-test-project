export type ProductType = {
  sku: string;
  name: string;
  type: string;
  price: number;
  size?: number;
  weight?: number;
  width?: number;
  height?: number;
  length?: number;
};

export type AddProductResult = {
  success?: boolean;
  error?: boolean;
  code: string;
  message: string;
};
