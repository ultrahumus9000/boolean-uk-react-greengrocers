import Store from "./Store";

function Header({
  products,
  setProducts,
  cartItems,
  setCartItems,
  setTotalPrice,
  totalPrice,
}) {
  //   console.log(products);

  return (
    <header id="store">
      <h1>Greengrocers</h1>
      <ul className="item-list store--item-list">
        {products.map((product, index) => {
          return (
            <Store
              key={index}
              product={product}
              setProducts={setProducts}
              cartItems={cartItems}
              setCartItems={setCartItems}
              products={products}
              setTotalPrice={setTotalPrice}
              totalPrice={totalPrice}
            />
          );
        })}
      </ul>
    </header>
  );
}
export default Header;
