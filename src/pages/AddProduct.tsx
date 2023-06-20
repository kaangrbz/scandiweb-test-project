import React, {
    ComponentType,
    useRef,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const AddProduct: ComponentType<Props> = (props) => {
    const sku_ref = useRef<HTMLInputElement>(null);
    const name_ref = useRef<HTMLInputElement>(null);
    const price_ref = useRef<HTMLInputElement>(null);
    const type_ref = useRef<HTMLSelectElement>(null);
    const size_ref = useRef<HTMLInputElement>(null);
    const weight_ref = useRef<HTMLInputElement>(null);
    const height_ref = useRef<HTMLInputElement>(null);
    const width_ref = useRef<HTMLInputElement>(null);
    const length_ref = useRef<HTMLInputElement>(null);
    const [selectedType, setSelectedType] = useState<String>();
    const [typeText, setTypeText] = useState<String>('');
    const [specialProperties, setSpecialProperties] = useState<ReactNode>();

    useEffect(() => {
        switch (type_ref.current?.value) {
            case 'dvd':
                setSpecialProperties(
                    <>
                        <tr>
                            <td>Size (MB)</td>
                            <td>
                                <input type="number" id="size" ref={size_ref} />
                            </td>
                        </tr>
                    </>
                );
                setTypeText('Please enter megabyte value of dvd');
                break;
            case 'furniture':
                setSpecialProperties(
                    <>
                        <tr>
                            <td>Height (CM)</td>
                            <td>
                                <input
                                    type="number"
                                    id="height"
                                    ref={height_ref}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Width (CM)</td>
                            <td>
                                <input
                                    type="number"
                                    id="width"
                                    ref={width_ref}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Length (CM)</td>
                            <td>
                                <input
                                    type="number"
                                    id="length"
                                    ref={length_ref}
                                />
                            </td>
                        </tr>
                    </>
                );
                setTypeText('Please provide dimensions in HxWxL format.');
                break;
            case 'book':
                setSpecialProperties(
                    <>
                        <tr>
                            <td>Weight (kg)</td>
                            <td>
                                <input
                                    type="number"
                                    id="weight"
                                    ref={weight_ref}
                                />
                            </td>
                        </tr>
                    </>
                );
                setTypeText('Please enter kilogram value of book');
                break;
        }
    }, [selectedType]);

    const handleSelectChange = () => {
        setSelectedType(type_ref.current?.value ?? '');
    };

    const handleSave = () => {
        console.log(
            sku_ref.current?.value,
            name_ref.current?.value,
            price_ref.current?.value,
            type_ref.current?.value
        );
    };

    return (
        <>
            <div className="toolbar">
                <h1>Product Add</h1>

                <div className="buttons">
                    <button type="button" onClick={handleSave}>
                        Save
                    </button>
                    <Link to="/">Cancel</Link>
                </div>
            </div>
            <main className="content">
                <form id="product_form">
                    <table className="product-table">
                        <tr>
                            <td>SKU</td>
                            <td>
                                <input type="text" id="sku" ref={sku_ref} />
                            </td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input type="text" id="name" ref={name_ref} />
                            </td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input type="text" id="name" ref={name_ref} />
                            </td>
                        </tr>
                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input type="number" id="price" ref={price_ref} onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Type Switcher</td>
                            <td>
                                <select
                                    id="productType"
                                    ref={type_ref}
                                    onChange={handleSelectChange}
                                >
                                    <option value="dvd" selected>
                                        Dvd
                                    </option>
                                    <option value="book">Book</option>
                                    <option value="furniture">Furniture</option>
                                </select>
                            </td>
                        </tr>
                        {specialProperties}
                        <tr>
                            <td colSpan={2}>
                                {typeText}
                            </td>
                        </tr>
                    </table>
                </form>
            </main>

            <hr />
            
            <center>Scandiweb test assignment</center>
        </>
    );
};

export default AddProduct;
