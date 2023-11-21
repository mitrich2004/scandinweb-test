import {useState, useEffect } from 'react';
import ProductList from './ProductList';
import HomeNavbar from './HomeNavbar';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState([]);

    const handleDelete = () => { 
        checkedProducts.forEach(id => {
            fetch('http://localhost:8000/products/' + id, { method: 'DELETE' }).then(() => {
                setCheckedProducts([]);
            });
        })
    }

    useEffect(() => {
        fetch('http://localhost:8000/products')
        .then(res => {
            if (!res.ok)
            {
                throw Error("could not fetch data");
            }

            return res.json();
        })
        .then(data => {
            setProducts(data);
        });
    }, [checkedProducts]);

    return ( 
        <div>
            <HomeNavbar handleDelete={handleDelete}/>
            <ProductList products={products} checkedProducts={checkedProducts} setCheckedProducts={setCheckedProducts}/>
        </div>
     );
}
 
export default Home;