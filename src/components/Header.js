import { useState } from "react";
import Store from "./Store";

function Header({ products, setProducts, addCartItemToServer }) {
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

  function postToStore(object) {
    return fetch("http://localhost:4000/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    })
      .then((resp) => resp.json())
      .then((newProductFromServer) => {
        setProducts([...products, newProductFromServer]);
      });
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
      <form
        name="form"
        className="new-form"
        onSubmit={(e) => {
          e.preventDefault();
          let newObject = {
            id: form.vegename.value,
            name: form.vegename.value,
            price: parseFloat(form.vegeprice.value),
            amount: parseFloat(form.vegeamount.value),
          };
          // console.log(newObject);
          postToStore(newObject).then(() => {
            form.reset();
          });
        }}
      >
        <label> Add More Veges </label>
        <input name="vegename" type="text"></input>
        <label> Add Picture</label>
        <input type="src"></input>
        <label> Add Price</label>
        <input name="vegeprice" step={0.1} precision={2} type="number"></input>
        <label> Add Amount</label>
        <input name="vegeamount" type="number"></input>
        <button>Add</button>
      </form>
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
