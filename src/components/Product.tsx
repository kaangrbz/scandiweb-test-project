import {useId, memo} from 'react';
import {ProductProps} from '../types';

const Product = ({product, onToggleProduct, checked}: ProductProps) => {
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
            checked={checked}
            onChange={() => {
              onToggleProduct(product.sku);
            }}
          />
        </label>
      </div>

      <div className="product-content">
        <div>{product.sku}</div>
        <div>{product.name}</div>
        <div>{product.price.toFixed(2)} $</div>
        <div>{specifiedValue}</div>
      </div>
    </span>
  );
};

export default memo(Product);
