import Product from "./Product";

const ProductList = ({products, checkedProducts, setCheckedProducts}) => {
    return ( 
        <div className="content">
            {products.map(product => (
                <Product key={product.id} product={product} checkedProducts={checkedProducts} setCheckedProducts={setCheckedProducts}/>
            ))}
        </div>
     );
}
 
export default ProductList;