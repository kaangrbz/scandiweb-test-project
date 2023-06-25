import {useRef, useState, useEffect, ReactNode} from 'react';

import {Link} from 'react-router-dom';
import {AddProductResult} from '../types';

const AddProduct = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedType, setSelectedType] = useState<string>();
  const [typeText, setTypeText] = useState<string>('');
  const [specialProperties, setSpecialProperties] = useState<ReactNode>();

  useEffect(() => {
    switch (formRef.current?.type.value) {
      case 'dvd':
        setSpecialProperties(
          <tr>
            <td>Size (MB)</td>
            <td>
              <input type="number" id="size" name="size" />
            </td>
          </tr>,
        );
        setTypeText('Please enter megabyte value of dvd');
        break;
      case 'furniture':
        setSpecialProperties(
          <>
            <tr>
              <td>Height (CM)</td>
              <td>
                <input type="number" id="height" name="height" />
              </td>
            </tr>
            <tr>
              <td>Width (CM)</td>
              <td>
                <input type="number" id="width" name="width" />
              </td>
            </tr>
            <tr>
              <td>Length (CM)</td>
              <td>
                <input type="number" id="length" name="length" />
              </td>
            </tr>
          </>,
        );
        setTypeText('Please provide dimensions in HxWxL format.');
        break;
      case 'book':
        setSpecialProperties(
          <tr>
            <td>Weight (kg)</td>
            <td>
              <input type="number" id="weight" name="weight" />
            </td>
          </tr>,
        );
        setTypeText('Please enter kilogram value of book');
        break;
      default:
        break;
    }
  }, [selectedType]);

  const handleSelectChange = () => {
    setSelectedType(formRef.current?.type.value ?? '');
  };

  const handleSave = async (e: any) => {
    e.preventDefault();

    const formdata = new FormData();
    const {sku, name, price, type, size, weight, width, height, length} = e.target;

    formdata.append('sku', sku.value ?? '');
    formdata.append('name', name.value ?? '');
    formdata.append('price', price.value ?? '');
    formdata.append('type', type.value ?? '');
    formdata.append('size', size.value ?? '');
    formdata.append('weight', weight.value ?? '');
    formdata.append('width', width.value ?? '');
    formdata.append('height', height.value ?? '');
    formdata.append('length', length.value ?? '');

    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/add_product.php`, {
      method: 'POST',
      body: formdata,
    });

    const result: AddProductResult = await response.json();

    if (result.error) {
      console.error(result.message);
    }
  };

  return (
    <form id="product_form" ref={formRef} onSubmit={handleSave}>
      <div className="toolbar">
        <h1>Product Add</h1>

        <div className="buttons">
          <button type="submit">Save</button>
          <Link to="/">Cancel</Link>
        </div>
      </div>
      <main className="content">
        <table className="product-table w-full">
          <tbody>
            <tr>
              <td>SKU</td>
              <td>
                <input type="text" id="sku" placeholder="Enter SKU" name="sku" />
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input type="text" id="name" placeholder="Enter product name" name="name" />
              </td>
            </tr>
            <tr>
              <td>Price ($)</td>
              <td>
                <input type="number" id="price" name="price" placeholder="Enter price" />
              </td>
            </tr>
            <tr>
              <td>Type Switcher</td>
              <td>
                <select id="productType" name="type" onChange={handleSelectChange}>
                  <option value="" disabled>
                    Choose type
                  </option>
                  <option value="dvd">DVD</option>
                  <option value="book">Book</option>
                  <option value="furniture">Furniture</option>
                </select>
              </td>
            </tr>
            {specialProperties}
            <tr>
              <td colSpan={2}>{typeText}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </form>
  );
};

export default AddProduct;
