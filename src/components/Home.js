import axios from "axios";
import {useState, useEffect } from 'react';
import ProductList from './ProductList';
import HomeNavbar from './HomeNavbar';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleDelete = () => { 
        if (checkedProducts.length > 0)
        {
            axios.post('https://juniortest-siarhei-miachkou-api.000webhostapp.com/' + checkedProducts).then((response) => 
            {
                if (response.data.status === 1)
                {
                    toast.success(response.data.msg);
                    setCheckedProducts([]);
                }
                else
                {
                    toast.error(response.data.msg);
                }
            })
            .catch(error => {
                toast.error(error.message);
            });
        }
    }

    useEffect(() => {
        axios.get('https://juniortest-siarhei-miachkou-api.000webhostapp.com/').then(function(response) {
            setIsLoading(false);
            if (response.data.status === 1)
            {
                setProducts(response.data.data);

                if (history.location.state === 'addedProduct')
                {
                    history.replace('/');
                    toast.success('Product added successfully');
                }
            }
            else
            {
                toast.error(response.data.msg);
            }
        })
        .catch(error => {
            setIsLoading(false);
            setError(error.message);
            toast.error(error.message);
        })
    }, [checkedProducts, history]);

    return ( 
        <div>
            <HomeNavbar handleDelete={handleDelete}/>
            {isLoading && <div className="message">Loading...</div>}
            {error && <div className="message">{error}</div>}
            <ProductList products={products} checkedProducts={checkedProducts} setCheckedProducts={setCheckedProducts}/>
            <ToastContainer
                autoClose={1000}
                hideProgressBar
            />
        </div>
     );
}
 
export default Home;