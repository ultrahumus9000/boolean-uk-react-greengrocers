function Cart({
  cartItem,
  setProducts,
  setCartItems,
  totalPrice,
  setTotalPrice,
  products,
  cartItems,
  targetProduct,
}) {
  function disabledMoreThan(cartItem) {
    if (cartItem.quantity >= 5) {
      return true;
    }
    return false;
  }

  function disabledLessThan(cartItem) {
    if (cartItem.quantity <= 0) {
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
        disabled={disabledLessThan(cartItem)}
        onClick={() => {
          let newPrice = totalPrice;
          let filteredCartItems = cartItems.map((item) => {
            if (item.id === cartItem.id) {
              if (item.quantity <= 0) {
                return (item = { ...item, quantity: 0 });
              } else {
                newPrice = newPrice - targetProduct.price;
                return (item = {
                  ...item,
                  quantity: item.quantity - 1,
                });
              }
            }
            return item;
          });

          let filteredProducts = products.map((product) => {
            if (product.id === cartItem.id) {
              if (product.amount >= 5) {
                return (product = { ...product, amount: 5 });
              } else {
                return (product = { ...product, amount: product.amount + 1 });
              }
            } else return product;
          });
          setCartItems(filteredCartItems);
          setTotalPrice(newPrice);
          setProducts(filteredProducts);
        }}
      >
        -
      </button>
      <span className="quantity-text center">{cartItem.quantity}</span>
      <button
        className="quantity-btn add-btn center"
        disabled={disabledMoreThan(cartItem)}
        onClick={() => {
          let newPrice = totalPrice;
          let filteredCartItems = cartItems.map((item) => {
            if (item.id === cartItem.id) {
              if (item.quantity > 5) {
                alert("no more stock");
                return (item = { ...item, quantity: 5 });
              } else {
                newPrice = newPrice + targetProduct.price;
                return (item = {
                  ...item,
                  quantity: item.quantity + 1,
                });
              }
            }
            return item;
          });

          let filteredProducts = products.map((product) => {
            if (product.id === cartItem.id) {
              if (product.amount <= 1) {
                alert("No More Stock");
                return (product = { ...product, amount: 0 });
              } else {
                return (product = { ...product, amount: product.amount - 1 });
              }
            } else return product;
          });
          setCartItems(filteredCartItems);
          setTotalPrice(newPrice);
          setProducts(filteredProducts);
        }}
      >
        +
      </button>
    </li>
  );
}

export default Cart;
