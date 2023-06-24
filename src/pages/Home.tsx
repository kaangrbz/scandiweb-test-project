import { ComponentType, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

type Product = {
    sku: string,
    name: string,
    type: string,
    price: number,
    size?: number,
    weight?: number,
    width?: number,
    height?: number,
    length?: number,
}

const Home: ComponentType<Props> = (props) => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        async function run() {

            const formdata = new FormData();

            formdata.append('type', 'dvd');

            const response = await fetch(
                `${process.env.REACT_APP_ENDPOINT}/api/get_product.php`,
                {
                    method: 'POST',
                    body: formdata
                }
            );
            
            const result: Product[] = await response.json();

            if (Array.isArray(result) && result.length > 0) {
                setProducts(result);
            }
            // console.log(result);
        }

        run();
    }, []);

    const getSpecifiedValue = (item: Product): String => {
        let text = '';
        switch (item?.type) {
            case 'dvd':
                text = 'Size: ' + item.size + ' mb';
                break;
            case 'book':
                text = 'Weight: ' + item.weight + 'kg';
                break;
            case 'furniture':
                text =  `Dimensions: ${item.width}x${item.height}x${item.length}`;
                break;
        }
        return text;
    };

    return (
        <>
            <div className="toolbar">
                <h1>Product List</h1>

                <div className="buttons">
                    <Link to="/addproduct">ADD</Link>
                    <button id="delete-product-btn" type="button">
                        MASS DELETE
                    </button>
                </div>
            </div>
            <main className="content">
                <div className="products">
                    {products.length > 0
                        ? products.map((item, index) => {
                              return (
                                  <span className="product" key={index}>
                                      <div className="product-checkbox">
                                          <label htmlFor={'checkbox_' + index}>
                                              <input
                                                  type="checkbox"
                                                  id={'checkbox_' + index}
                                                  className="delete-checkbox"
                                              />
                                          </label>
                                      </div>
                                      <div className="product-content">
                                          <div>{item.sku}</div>
                                          <div>{item.name}</div>
                                          <div>{item.price} $</div>
                                          <div>
                                              {getSpecifiedValue(item)}
                                          </div>
                                      </div>
                                  </span>
                              );
                          })
                        : 'No product added.'}
                </div>
            </main>
        </>
    );
};

export default Home;
