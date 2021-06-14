import { useState } from "react";
import Cart from "./Cart";

function Main({
  cartItems,
  total,
  products,
  addCartItemToServer,
  reduceCartItemToServer,
}) {
  return (
    <main id="cart">
      <h2>Your Cart</h2>
      <div className="cart--item-list-container">
        <ul className="item-list cart--item-list">
          <li className="shopping-headline">
            {""}
            <span> Name </span>
            <span>Price</span>
            <span>Quantity</span>{" "}
          </li>
          {cartItems.map((item, index) => {
            const targetProduct = products.find(
              (product) => product.id === item.id
            );
            console.log(targetProduct);
            return (
              <Cart
                key={index}
                cartItem={item}
                addCartItemToServer={addCartItemToServer}
                reduceCartItemToServer={reduceCartItemToServer}
                targetProduct={targetProduct}
              />
            );
          })}
        </ul>
      </div>
      <div className="total-section">
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <span className="total-number">£{total.toFixed(2)}</span>
        </div>
      </div>
    </main>
  );
}

export default Main;
