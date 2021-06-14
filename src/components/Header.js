import { useState } from "react";
import Store from "./Store";

function Header({ products, addToCart, addCartItemToServer }) {
  const [selectedOption, setSelectedOption] = useState("high");

  let sortedProducts = [...products];

  if (selectedOption === "high") {
    sortedProducts.sort((a, b) => (a.price < b.price ? 1 : -1));
  }
  if (selectedOption === "low") {
    sortedProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
  }
  if (selectedOption === "Z") {
    sortedProducts.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  if (selectedOption === "A") {
    sortedProducts.sort((a, b) => (a.name < b.name ? 1 : -1));
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
        {sortedProducts.map((product, index) => {
          return (
            <Store
              key={index}
              product={product}
              addCartItemToServer={addCartItemToServer}
            />
          );
        })}
      </ul>
    </header>
  );
}
export default Header;
