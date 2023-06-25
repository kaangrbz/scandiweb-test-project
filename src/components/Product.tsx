import {useId, useMemo, memo} from 'react';
import {ProductType} from '../types';

type Props = {product: ProductType; onToggleProduct: (sku: string) => void};

const Product = (props: Props) => {
  const {product, onToggleProduct} = props;

  const inputId = useId();

  const specifiedValue = useMemo(() => {
    switch (product.type) {
      case 'dvd':
        return `Size: ${product.size} mb`;
      case 'book':
        return `Weight: ${product.weight}kg`;
      case 'furniture':
        return `Dimensions: ${product.width}x${product.height}x${product.length}`;
      default:
        return '';
    }
  }, [product]);

  return (
    <span className="product">
      <div className="product-checkbox">
        <label htmlFor={inputId}>
          <input
            type="checkbox"
            id={inputId}
            className="delete-checkbox"
            onChange={() => {
              onToggleProduct(product.sku);
            }}
          />
        </label>
      </div>

      <div className="product-content">
        <div>{product.sku}</div>
        <div>{product.name}</div>
        <div>{product.price} $</div>
        <div>{specifiedValue}</div>
      </div>
    </span>
  );
};

export default memo(Product);
