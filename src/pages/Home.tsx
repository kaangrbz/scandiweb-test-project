import {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import Product from '../components/Product';

import {ProductType} from '../types';

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

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
    })();
  }, []);

  // TODO: check for getting selected items
  const onToggleProduct = useCallback((sku: string) => {
    setSelected((prev) => {
      if (prev.includes(sku)) {
        return prev.filter((item) => item !== sku);
      }

      return [...prev, sku];
    });
  }, []);

  // TODO: body json yap
  // TODO: mass delete backendini yap ve test et
  const handleMassDelete = async () => {
    if (selected.length <= 0) {
      return;
    }

    const skus = selected.map((sku) => `'${sku}'`).join(',');

    const data = {
      skus,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/products.php`, {
        method: 'DELETE',
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        setProducts((prev) => prev.filter((product) => !selected.includes(product.sku)));
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

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
        <div className="products">
          {products.length > 0
            ? products.map((product) => (
                <Product key={product.sku} product={product} onToggleProduct={onToggleProduct} />
              ))
            : 'No product added.'}
        </div>
      </main>
    </>
  );
};

export default Home;
