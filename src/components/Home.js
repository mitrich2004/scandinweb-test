import axios from "axios";
import {useState, useEffect } from 'react';
import ProductList from './ProductList';
import HomeNavbar from './HomeNavbar';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState([]);

    const handleDelete = () => { 
        checkedProducts.forEach(id => {
            axios.post('https://juniortest-siarhei-miachkou-api.000webhostapp.com/' + id).then((response) => {
                console.log(response.data);
                setCheckedProducts([]);
            })
            .catch(err => {
                console.log(err);
            });
        })
    }

    useEffect(() => {
        axios.get('https://juniortest-siarhei-miachkou-api.000webhostapp.com/').then(function(response) {
            if (response.data.status === 1)
            {
                setProducts(response.data.data);
            }
            else
            {
                console.log(response.data.err);
            }
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