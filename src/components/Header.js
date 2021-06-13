import { useState } from "react";
import Store from "./Store";

function Header({
  products,
  setProducts,
  cartItems,
  setCartItems,
  setTotalPrice,
  totalPrice,
}) {
  const [selectedOption, setSelectedOption] = useState("high");

  if (selectedOption === "high") {
    let filteredProducts = products.sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setProducts(filteredProducts);
  }
  if (selectedOption === "low") {
    let filteredProducts = products.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    setProducts(filteredProducts);
  }
  if (selectedOption === "Z") {
    let filteredProducts = products.sort((a, b) => (a.name > b.name ? 1 : -1));
    setProducts(filteredProducts);
  }
  if (selectedOption === "A") {
    let filteredProducts = products.sort((a, b) => (a.name < b.name ? 1 : -1));
    setProducts(filteredProducts);
  }

  return (
    <header id="store">
      <h1>Greengrocers</h1>
      <div>
        {" "}
        <label className="sort-label">Sort by</label>
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <option value={"high"}>Price High to Low</option>
          <option value={"low"}>Price Low to High</option>
          <option value={"Z"}>Name from A-Z</option>
          <option value={"A"}>Name from Z-A</option>
        </select>
      </div>
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
