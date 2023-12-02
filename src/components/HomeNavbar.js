import { Link } from "react-router-dom";

const HomeNavbar = ({handleDelete}) => {
    return ( 
        <header className="navbar">
            <h1 data-testid="header-text">Product List</h1>
            <div className="buttons">
                <Link to="/add-product"> <button data-testid='add-button' className="button-positive">ADD</button> </Link>
                <button data-testid='delete-button' className="button-negative" onClick={handleDelete}>MASS DELETE</button>
            </div>
        </header>
     );
}
 
export default HomeNavbar;