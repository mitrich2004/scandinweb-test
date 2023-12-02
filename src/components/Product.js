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
        <div data-testid={product.id} className="product">
            <input data-testid='product-checkbox' className="delete-checkbox" type="checkbox" onClick={(e) => handleClick(e.target.checked)}></input>
            <p data-testid='sku-text'>{ product.sku }</p>
            <p data-testid='name-text'>{ product.name }</p>
            <p data-testid='price-text'>{ product.price + '$' }</p>
            {product.size && <p data-testid='size-text'>{ 'Size: ' + product.size +'MB' }</p>}
            {product.weight && <p data-testid='weight-text'>{ 'Weight: ' + product.weight +'KG' }</p>}
            {product.length && <p data-testid='dimensions-text'>{ `Dimensions: ${product.height}x${product.width}x${product.length}`}</p>}
        </div>
     );
}
 
export default Product;