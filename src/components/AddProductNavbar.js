import { Link } from "react-router-dom";

const AddProductNavbar = () => {
    return ( 
        <header className="navbar">
            <h1>Product Add</h1>
            <div className="buttons">
                <button type="submit" form="product_form" className="button-positive">Save</button> 
                <Link to="/"> <button className="button-negative">Cancel</button> </Link>
            </div>
        </header>
     );
}
 
export default AddProductNavbar;