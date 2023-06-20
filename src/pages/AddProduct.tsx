import React, { ComponentType, useRef } from 'react';
import {Link} from 'react-router-dom';

type Props = {}

const AddProduct: ComponentType<Props> = (props) => {

  const sku_value = useRef<HTMLInputElement>(null);
  const name_value = useRef<HTMLInputElement>(null);
  const price_value = useRef<HTMLInputElement>(null);
  const type_value = useRef<HTMLSelectElement>(null);


  const handleSave = () => {
    console.log(sku_value.current?.value, name_value.current?.value, price_value.current?.value, type_value.current?.value)
  }

  return (
    <>
      <div className='toolbar'>
          <h1>Product Add</h1>

          <div className="buttons">
            <button type='button' onClick={handleSave}>Save</button>
            <Link to='/'>Cancel</Link>
          </div>
          
      </div>
      <main className='content'>
        <form>
          <table className='product_form'>
            <tr>
              <td>SKU</td>
              <td>
                <input type="text" id='sku' ref={sku_value} />
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input type="text" id='name' ref={name_value} />
              </td>
            </tr>
            <tr>
              <td>Price ($)</td>
              <td>
                <input type="text" id='price' ref={price_value} />
              </td>
            </tr>
            <tr>
              <td>
                Type Switcher
              </td>
              <td>
                <select id="productType" ref={type_value}>
                  <option value="disc">Dvd</option>
                  <option value="book">Book</option>
                  <option value="furniture">Furniture</option>
                </select>
              </td>
            </tr>
          </table>
        </form>



      </main>

      <hr />
       <p><center>Scandiweb test assignment</center></p>
    </>
  )
}

export default AddProduct;
