import { ComponentType } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Home: ComponentType<Props> = (props) => {
    const products = [
        {
            name: 'Table',
            product_code: 'FR001',
            type: 'furniture',
            price: '12.12',
            dynamic_value: '20x20x35',
        },
        {
            name: 'Table',
            product_code: 'FR001',
            type: 'furniture',
            price: '12.12',
            dynamic_value: '20x20x35',
        },
        {
            name: 'Table',
            product_code: 'FR001',
            type: 'furniture',
            price: '12.12',
            dynamic_value: '20x20x35',
        },
        {
            name: 'Table',
            product_code: 'FR001',
            type: 'furniture',
            price: '12.12',
            dynamic_value: '20x20x35',
        },
        {
            name: 'Disc',
            product_code: 'DSC001',
            type: 'disc',
            price: '35',
            dynamic_value: '600',
        },
        {
            name: 'Disc',
            product_code: 'DSC001',
            type: 'disc',
            price: '35',
            dynamic_value: '600',
        },
        {
            name: 'Disc',
            product_code: 'DSC001',
            type: 'disc',
            price: '35',
            dynamic_value: '600',
        },
        {
            name: 'Disc',
            product_code: 'DSC001',
            type: 'disc',
            price: '35',
            dynamic_value: '600',
        },
        {
            name: 'Miserables',
            product_code: 'BKR001',
            type: 'book',
            price: '25',
            dynamic_value: '2',
        },
        {
            name: 'Miserables',
            product_code: 'BKR001',
            type: 'book',
            price: '25',
            dynamic_value: '2',
        },
        {
            name: 'Miserables',
            product_code: 'BKR001',
            type: 'book',
            price: '25',
            dynamic_value: '2',
        },
        {
            name: 'Miserables',
            product_code: 'BKR001',
            type: 'book',
            price: '25',
            dynamic_value: '2',
        },
    ];

    const getSpecifiedValue = (
        specified_value: String,
        type: String
    ): String => {
        let text: String = specified_value;
        switch (type) {
            case 'disc':
                text = 'Size: ' + specified_value + ' mb';
                break;
            case 'book':
                text = 'Weight: ' + specified_value + 'kg';
                break;
            case 'furniture':
                text = 'Dimesion: ' + specified_value;
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
                    <button id='delete-product-btn' type="button">MASS DELETE</button>
                </div>
            </div>
            <main className="content">
                <div className="products">
                    {products.length > 0
                        ? products.map((item, index) => {
                              return (
                                  <span className="product">
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
                                          <div>{item.name}</div>
                                          <div>{item.product_code}</div>
                                          <div>{item.price} $</div>
                                          <div>
                                              {getSpecifiedValue(
                                                  item.dynamic_value,
                                                  item.type
                                              )}
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
