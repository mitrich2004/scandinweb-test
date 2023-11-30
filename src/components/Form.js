import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const productTypeMapper = new Map([
        ["DVD", 0],
        ["Book", 1],
        ["Furniture", 2]
    ]); 

    //general properties
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [productType, setProductType] = useState("DVD");

    //specific properties
    const [size, setSize] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");

    //errors
    const [skuErrorStatus, setSkuErrorStatus] = useState(false);
    const [nameErrorStatus, setNameErrorStatus] = useState(false);
    const [priceErrorStatus, setPriceErrorStatus] = useState(false);
    const [sizeErrorStatus, setSizeErrorStatus] = useState(false);
    const [weightErrorStatus, setWeightErrorStatus] = useState(false);
    const [heightErrorStatus, setHeightErrorStatus] = useState(false);
    const [widthErrorStatus, setWidthErrorStatus] = useState(false);
    const [lengthErrorStatus, setLengthErrorStatus] = useState(false);

    const history = useHistory();

    const handleSelect = (e) =>
    {
        switch (e.target.value)
        {
            case "DVD": 
                setProductType("DVD"); 
                setWeight("");
                setHeight(""); 
                setWidth(""); 
                setLength("");
                break;
            case "Book": 
                setProductType("Book"); 
                setHeight(""); 
                setWidth(""); 
                setLength("");
                setSize(""); 
                break;
            case "Furniture": 
                setProductType("Furniture"); 
                setSize(""); 
                setWeight("");
                break;
            default: break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSkuErrorStatus(false);
        setNameErrorStatus(false);
        setPriceErrorStatus(false);
        setSizeErrorStatus(false);
        setWeightErrorStatus(false);
        setHeightErrorStatus(false);
        setWidthErrorStatus(false);
        setLengthErrorStatus(false);
        
        const productTypeEnum = productTypeMapper.get(productType);
    
        const product = { 
            sku: sku, 
            name: name, 
            price: parseInt(price), 
            productType: productTypeEnum,
            size: (productTypeEnum === 0) ? parseInt(size) : null, 
            weight: (productTypeEnum === 1) ? parseInt(weight) : null, 
            height: (productTypeEnum === 2) ? parseInt(height) : null, 
            width: (productTypeEnum === 2) ? parseInt(width) : null, 
            length: (productTypeEnum === 2) ? parseInt(length) : null 
        };

        if (!validate(product))
        {
            return;
        }
    
        axios.post('https://juniortest-siarhei-miachkou-api.000webhostapp.com/', JSON.stringify(product)).then(function(response)
        {
            if (response.data.status === 1)
            {
                history.push({
                    pathname: '/',
                    state: 'addedProduct'
                });
            }
            else
            {
                toast.error(response.data.msg);
                if (response.data.err.includes("Duplicate entry"))
                {
                    toast.error("SKU must be unique");
                }
            }
        })
        .catch(error => {
            toast.error(error.message);
        });
    }

    const validate = (product) => {
        let dataIsOkay = true;

        if (product.sku.trim().length === 0)
        {
            setSkuErrorStatus(true); setSku("");
            dataIsOkay = false;
        }

        if (product.name.trim().length === 0)
        {
            setNameErrorStatus(true); setName("");
            dataIsOkay = false;
        }

        if (product.price <= 0)
        {
            setPriceErrorStatus(true); setPrice("");
            dataIsOkay = false;
        }

        if (product.productType === 0 && product.size <= 0)
        {   
            setSizeErrorStatus(true); setSize("");
            dataIsOkay = false;
        }

        if (product.productType === 1 && product.weight <= 0)
        {   
            setWeightErrorStatus(true); setWeight("");
            dataIsOkay = false;
        }

        if (product.productType === 2)
        {
            if (product.height <= 0)
            {
                setHeightErrorStatus(true); setHeight("");
                dataIsOkay = false;
            }

            if (product.width <= 0)
            {
                setWidthErrorStatus(true); setWidth("");
                dataIsOkay = false;
            }

            if (product.length <= 0)
            {
                setLengthErrorStatus(true); setLength("");
                dataIsOkay = false;
            }
        }

        return dataIsOkay;
    }

    return ( 
        <div className="create">
            <form id="product_form" onSubmit={handleSubmit}>
                <label>SKU</label>
                {skuErrorStatus && <p className="errorText">SKU must contain symbols</p>}
                <input 
                    placeholder="Enter product's SKU..."
                    id="sku"
                    type="text" 
                    required 
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                />
                
                <label>Name</label>
                {nameErrorStatus && <p className="errorText">Name must contain symbols</p>}
                <input 
                    placeholder="Enter product's name..."
                    id="name"
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Price ($)</label>
                {priceErrorStatus && <p className="errorText">Price must be a positive integer</p>}
                <input 
                    placeholder="Enter product's price..."
                    id="price"
                    type="number" 
                    required 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label>Type Switcher</label>
                <select 
                    value={productType} 
                    id="productType"
                    onChange={e => handleSelect(e)}
                >
                    <option value="DVD">DVD</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
                </select>

                {productType === "DVD" && <div className="create">
                    <label>Size (MB)</label>
                    {sizeErrorStatus && <p className="errorText">Size must be a positive integer</p>}
                    <input 
                        placeholder="Enter DVD's size..."
                        id="size"
                        type="number" 
                        required 
                        value={(size) ? size : ""}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>}

                {productType === "Book" && <div className="create">
                    <label>Weight (KG)</label>
                    {weightErrorStatus && <p className="errorText">Weight must be a positive integer</p>}
                    <input 
                        placeholder="Enter book's weight..."
                        id="weight"
                        type="number" 
                        required 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>}

                {productType === "Furniture" && <div className="create">
                    <label>Height (CM)</label>
                    {heightErrorStatus && <p className="errorText">Height must be a positive integer</p>}
                    <input 
                        placeholder="Enter item's height..."
                        id="height"
                        type="number" 
                        required 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />

                    <label>Width (CM)</label>
                    {widthErrorStatus && <p className="errorText">Width must be a positive integer</p>}
                    <input 
                        placeholder="Enter item's width..."
                        id="width"
                        type="number" 
                        required 
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />

                    <label>Length (CM)</label>
                    {lengthErrorStatus && <p className="errorText">Length must be a positive integer</p>}
                    <input 
                        placeholder="Enter item's length..."
                        id="length"
                        type="number" 
                        required 
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </div>}
            </form>
            <ToastContainer
                autoClose={1000}
                hideProgressBar
            />
        </div>
     );
}
 
export default Form;