import { Link } from "react-router-dom";

const HomeNavbar = ({handleDelete}) => {
    return ( 
        <header className="navbar">
            <h1>Product List</h1>
            <div className="buttons">
                <Link to="/add-product"> <button className="button-positive">ADD</button> </Link>
                <button className="button-negative" onClick={handleDelete}>MASS DELETE</button>
            </div>
        </header>
     );
}
 
export default HomeNavbar;