import { useState } from "react";
import { useHistory } from "react-router-dom";

const Form = () => {
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("DVD");

    const [size, setSize] = useState(null);
    const [weight, setWeight] = useState(null);

    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [length, setLength] = useState(null);

    const history = useHistory();

    const handleSelect = (e) =>
    {
        switch (e.target.value)
        {
            case "DVD": 
                setType("DVD"); 
                setWeight(null);
                setHeight(null); 
                setWidth(null); 
                setLength(null);
                break;
            case "Book": 
                setType("Book"); 
                setHeight(null); 
                setWidth(null); 
                setLength(null);
                setSize(null); 
                break;
            case "Furniture": 
                setType("Furniture"); 
                setSize(null); 
                setWeight(null);
                break;
            default: break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { SKU: sku, name: name, price: price, size: size, weight: weight, height: height, width: width, length: length };
    
        fetch('http://localhost:8000/products/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product)
        }).then(() => {
          history.push('/');
        })
    }

    return ( 
        <div className="create">
            <form id="product_form" onSubmit={handleSubmit}>
                <label>SKU</label>
                <input 
                    id="sku"
                    type="text" 
                    required 
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                />

                <label>Name</label>
                <input 
                    id="name"
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Price ($)</label>
                <input 
                    id="price"
                    type="number" 
                    required 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label>Type Switcher</label>
                <select 
                    value={type} 
                    id="productType"
                    onChange={e => handleSelect(e)}
                >
                    <option value="DVD">DVD</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
                </select>

                {type === "DVD" && <div className="create">
                    <label>Size (MB)</label>
                    <input 
                        id="size"
                        type="number" 
                        required 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>}

                {type === "Book" && <div className="create">
                    <label>Weight (KG)</label>
                    <input 
                        id="weight"
                        type="number" 
                        required 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>}

                {type === "Furniture" && <div className="create">
                    <label>Height (CM)</label>
                    <input 
                        id="height"
                        type="number" 
                        required 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />

                    <label>Width (CM)</label>
                    <input 
                        id="width"
                        type="number" 
                        required 
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />

                    <label>Length (CM)</label>
                    <input 
                        id="length"
                        type="number" 
                        required 
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </div>}

            </form>
        </div>
     );
}
 
export default Form;