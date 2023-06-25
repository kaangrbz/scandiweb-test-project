import {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import Product from '../components/Product';
import {ProductType} from '../types';

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    async function run() {
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/products.php`, {
        method: 'POST',
      }).catch((reason: unknown) => {
        console.error(reason);
      });

      const result: ProductType[] | [] = await response.json();

      if (Array.isArray(result?.data) && result.data.length > 0) {
        setProducts(result.data);
      }
    }

    run();
  }, []);

  const onToggleProduct = useCallback((sku: string) => {
    setSelected((prev) => {
      if (prev.includes(sku)) {
        const index = prev.indexOf(sku);
        prev.splice(index, 1);
      } else {
        prev.push(sku);
      }

      return prev;
    });
  }, []);

  const handleMassDelete = async () => {
    const formdata = new FormData();
    formdata.append('skus', selected);

    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/products.php`, {
      method: 'DELETE',
      body: formdata,
    }).catch((reason: unknown) => {
      console.error(reason);
    });

    console.info(selected, response);

    return;
    const result: ProductType[] = await response.json();

    if (Array.isArray(result) && result.length > 0) {
      setProducts(result);
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
