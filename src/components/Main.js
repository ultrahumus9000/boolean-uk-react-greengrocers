import { useState } from "react";
import Cart from "./Cart";

function Main({ cartItems, setCartItems, setProducts, products }) {
  console.log(cartItems);
  let total = 0;
  for (const cartItem of cartItems) {
    let targetProduct = products.find((product) => {
      return product.id === cartItem.id;
    });
    total = total + targetProduct.price * cartItem.quantity;
  }

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
            let targetProduct = products.find((product) => {
              return product.id === item.id;
            });

            return (
              <Cart
                key={index}
                cartItem={item}
                setCartItems={setCartItems}
                products={products}
                setProducts={setProducts}
                cartItems={cartItems}
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
