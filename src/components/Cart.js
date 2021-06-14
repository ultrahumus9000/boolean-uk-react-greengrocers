function Cart({ cartItem, addToCart, removeFromCart, targetProduct }) {
  function disabledMoreThan(cartItem) {
    if (cartItem.quantity >= 5) {
      return true;
    }
    return false;
  }

  return (
    <li className="list-bottom">
      <img
        className="cart--item-icon"
        src={`../icons/${cartItem.id}.svg`}
        alt="beetroot"
      />
      <p>{targetProduct.name}</p>
      <p>{targetProduct.price}</p>
      <button
        className="quantity-btn remove-btn center"
        onClick={() => removeFromCart(cartItem)}
      >
        -
      </button>
      <span className="quantity-text center">{cartItem.quantity}</span>
      <button
        className="quantity-btn add-btn center"
        disabled={disabledMoreThan(cartItem)}
        onClick={() => addToCart(cartItem)}
      >
        +
      </button>
    </li>
  );
}

export default Cart;
