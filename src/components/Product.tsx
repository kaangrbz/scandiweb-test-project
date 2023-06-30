import {useId, memo} from 'react';
import {ProductType} from '../types';

type Props = {
  product: ProductType;
  onToggleProduct: (sku: string) => void;
};

const Product = ({product, onToggleProduct}: Props) => {
  const inputId = useId();

  let specifiedValue = '';
  if (product.type === 'dvd') specifiedValue = `Size: ${product.size} mb`;
  else if (product.type === 'book') specifiedValue = `Weight: ${product.weight}kg`;
  else if (product.type === 'furniture')
    specifiedValue = `Dimensions: ${product.width}x${product.height}x${product.length}`;

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
