const Product = ({product, checkedProducts, setCheckedProducts}) => {

    const handleClick = (checked) => 
    {
        if (checked)
        {
            checkedProducts.push(product.id);
            setCheckedProducts(checkedProducts);
        }
        else
        {
            setCheckedProducts(checkedProducts.filter(id => id !== product.id));
        } 
    }

    return ( 
        <div className="product">
            <input className="delete-checkbox" type="checkbox" onClick={(e) => handleClick(e.target.checked)}></input>
            <p>{ product.sku }</p>
            <p>{ product.name }</p>
            <p>{ product.price + '$' }</p>
            {product.size && <p>{ 'Size: ' + product.size +'MB' }</p>}
            {product.weight && <p>{ 'Weight: ' + product.weight +'KG' }</p>}
            {product.length && <p>{ `Dimensions: ${product.height}x${product.width}x${product.length}`}</p>}
        </div>
     );
}
 
export default Product;