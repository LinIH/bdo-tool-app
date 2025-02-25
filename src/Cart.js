
function Cart({cart}){

    return(
        <div>
            <ul>
                {cart.map((product, index) => (
                    <li key={index}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;