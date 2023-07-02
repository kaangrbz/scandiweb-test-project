import React, {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import Product from '../components/Product';

import {ProductType} from '../types';

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/products.php`, {
        method: 'POST',
      });

      return res.json();
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getData();
      if (Array.isArray(result?.data) && result.data.length > 0) {
        setProducts(result.data);
      }
      setIsLoading(false);
    })();
  }, []);

  const onToggleProduct = useCallback((sku: string) => {
    setSelected((prev) => {
      if (prev.includes(sku)) {
        return prev.filter((item) => item !== sku);
      }
      return [...prev, sku];
    });
  }, []);

  const handleMassDelete = async () => {
    if (selected.length <= 0) {
      return;
    }

    const skus = selected.map((sku) => `'${sku}'`);
    const data = {skus};

    try {
      const res = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/products.php`, {
        method: 'DELETE',
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        setProducts((prev) => prev.filter((product) => !selected.includes(product.sku)));
        setSelected([]);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  let content: React.ReactNode;
  if (isLoading) {
    content = <div>Loading products</div>;
  } else {
    content =
      products.length > 0 ? (
        products.map((product) => (
          <Product
            key={product.sku}
            product={product}
            checked={selected.includes(product.sku)}
            onToggleProduct={onToggleProduct}
          />
        ))
      ) : (
        <div>No product added.</div>
      );
  }

  return (
    <>
      <div className="toolbar">
        <h1>Product List</h1>

        <div className="buttons">
          <Link to="/addproduct">ADD</Link>
          <button id="delete-product-btn" type="button" onClick={handleMassDelete}>
            MASS DELETE
          </button>
        </div>
      </div>
      <main className="content">
        <div className="products">{content}</div>
      </main>
    </>
  );
};

export default Home;
