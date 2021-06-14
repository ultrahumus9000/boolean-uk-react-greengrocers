function Store({
  product,
  setProducts,
  cartItems,
  setCartItems,
  products,
  setTotalPrice,
  totalPrice,
}) {
  // console.log(product.id);

  function value(product) {
    if (product.amount < 1) return true;
    return false;
  }

  return (
    <li className={`list ${product.amount < 1 ? "unavailable" : "available"}`}>
      <div className="store--item-icon">
        <img src={`../icons/${product.id}.svg`} alt="beetroot" />
      </div>
      <p>£{product.price}</p>
      <p>{product.name}</p>
      <button
        disabled={value(product)}
        onClick={() => {
          let indexExist = cartItems.findIndex((item) => {
            return item.id === product.id;
          });
          let newPrice = totalPrice;
          if (indexExist < 0) {
            let newCartItem = {
              id: product.id,
              quantity: 1,
            };
            setCartItems([...cartItems, newCartItem]);
            newPrice = totalPrice + product.price;
          } else {
            let filteredCartItems = cartItems.map((item) => {
              if (item.id === product.id) {
                newPrice = totalPrice + product.price;
                return (item = { ...item, quantity: item.quantity + 1 });
              }
              return item;
            });
            setCartItems(filteredCartItems);
          }
          setTotalPrice(newPrice);

          let filteredProducts = products.map((item) => {
            if (item.id === product.id) {
              if (item.amount <= 1) {
                alert("No More Stock");
                return (item = { ...item, amount: 0 });
              } else {
                return (item = { ...item, amount: item.amount - 1 });
              }
            }
            return item;
          });
          setProducts(filteredProducts);
        }}
      >
        Add to cart
      </button>
    </li>
  );
}
export default Store;
