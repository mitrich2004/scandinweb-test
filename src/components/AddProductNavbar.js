import { Link } from "react-router-dom";

const AddProductNavbar = () => {
    return ( 
        <header className="navbar">
            <h1 data-testid='header-text'>Product Add</h1>
            <div className="buttons">
                <button data-testid='save-button' type="submit" form="product_form" className="button-positive">Save</button> 
                <Link to="/"> <button data-testid='cancel-button' className="button-negative">Cancel</button> </Link>
            </div>
        </header>
     );
}
 
export default AddProductNavbar;