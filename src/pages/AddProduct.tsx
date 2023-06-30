import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Link, useNavigate} from 'react-router-dom';
import {AddProductForm} from '../types';

const AddProduct = () => {
  const navigate = useNavigate();
  const initialValues: AddProductForm = {
    sku: '',
    name: '',
    type: 'dvd',
    price: 0,
    size: 0,
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
  };

  const handleSave = async (values: AddProductForm) => {
    try {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/api/products.php`, {
        method: 'PUT',
        body: JSON.stringify(values),
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: {sku?: string; name?: string; price?: string; type?: string} = {};
        if (!values.sku) {
          errors.sku = 'Please enter sku';
        } else if (!values.name) {
          errors.name = 'Please enter name';
        } else if (!values.price.toString()) {
          errors.price = 'Please enter price';
        } else if (Number(values.price) < 0) {
          errors.price = 'Enter valid price';
        } else if (!values.type) {
          errors.type = 'Please select type';
        }
        return errors;
      }}
      onSubmit={handleSave}
    >
      {({values, isSubmitting}) => {
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
                      <ErrorMessage name="name" className="no-border" component="div" />
                    </td>
                  </tr>
                  <tr>
                    <td>Price ($)</td>
                    <td>
                      <Field type="number" id="price" name="price" placeholder="Enter price" />
                      <ErrorMessage name="price" className="no-border" component="div" />
                    </td>
                  </tr>
                  <tr>
                    <td>Type Switcher</td>
                    <td>
                      <Field as="select" id="productType" name="type">
                        <option value="" disabled>
                          Choose type
                        </option>
                        <option value="dvd">DVD</option>
                        <option value="book">Book</option>
                        <option value="furniture">Furniture</option>
                      </Field>
                      <ErrorMessage name="type" className="no-border" component="div" />
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
