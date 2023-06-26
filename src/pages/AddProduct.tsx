import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Formik, Form, Field, ErrorMessage} from 'formik';

import {Link} from 'react-router-dom';
import {AddProductForm} from '../types';

const AddProduct = () => {
  const initialValues: AddProductForm = {
    sku: '',
    name: '',
    price: '',
    type: 'dvd',
    size: '',
    weight: '',
    width: '',
    height: '',
    length: '',
  };

  const handleSave = async (values: AddProductForm) => {
    const data = {
      sku: values.sku,
      name: values.name,
      type: values.type,
      price: values.price,
      size: values.size,
      weight: values.weight,
      width: values.width,
      height: values.height,
      length: values.length,
    };

    try {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/api/products.php`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: {sku?: string} = {};
        if (!values.sku) {
          errors.sku = 'Required sku';
        }
        return errors;
      }}
      onSubmit={(values, {setSubmitting}) => {
        handleSave(values);
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({values, setValues, isSubmitting}) => {
        const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
          const {value} = event.target;
          const newValues = {...values, type: value};
          setValues(newValues);
        };

        return (
          <Form id="product_form">
            <div className="toolbar">
              <h1>Product Add</h1>

              <div className="buttons">
                <button type="submit" disabled={isSubmitting}>
                  Save
                </button>
                <Link to="/">Cancel</Link>
              </div>
            </div>
            <main className="content">
              <table className="product-table w-full">
                <tbody>
                  <tr>
                    <td>SKU</td>
                    <td>
                      <Field type="text" id="sku" name="sku" placeholder="Enter SKU" />
                      <ErrorMessage name="sku" className="no-border" component="div" />
                    </td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>
                      <Field type="text" id="name" name="name" placeholder="Enter product name" />
                    </td>
                  </tr>
                  <tr>
                    <td>Price ($)</td>
                    <td>
                      <Field type="number" id="price" name="price" placeholder="Enter price" />
                    </td>
                  </tr>
                  <tr>
                    <td>Type Switcher</td>
                    <td>
                      <Field as="select" id="productType" name="type" onChange={handleSelectChange}>
                        <option value="" disabled>
                          Choose type
                        </option>
                        <option value="dvd">DVD</option>
                        <option value="book">Book</option>
                        <option value="furniture">Furniture</option>
                      </Field>
                    </td>
                  </tr>
                  {values.type === 'dvd' && (
                    <>
                      <tr>
                        <td>Size (MB)</td>
                        <td>
                          <Field type="number" id="size" name="size" />
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={2}>Please enter megabyte value of DVD</td>
                      </tr>
                    </>
                  )}

                  {values.type === 'book' && (
                    <>
                      <tr>
                        <td>Weight (kg)</td>
                        <td>
                          <Field type="number" id="weight" name="weight" />
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={2}>Please enter kilogram value of book</td>
                      </tr>
                    </>
                  )}

                  {values.type === 'furniture' && (
                    <>
                      <tr>
                        <td>Height (CM)</td>
                        <td>
                          <Field type="number" id="height" name="height" />
                        </td>
                      </tr>
                      <tr>
                        <td>Width (CM)</td>
                        <td>
                          <Field type="number" id="width" name="width" />
                        </td>
                      </tr>
                      <tr>
                        <td>Length (CM)</td>
                        <td>
                          <Field type="number" id="length" name="length" />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>Please provide dimensions in HxWxL format</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </main>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProduct;
