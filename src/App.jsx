
import { useEffect, useState } from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import inititalStoreFoods from "./storeinfo"

import "./styles/index.css";


export default function App() {
  const [products, setProducts]= useState(inititalStoreFoods)
  const [cartItems, setCartItems] = useState([])

  // const [totalPrice, setTotalPrice] = useState(0.0); because we can just calculate it 

  useEffect(()=>{}, [])

  function addToCart() {
    // If the item is not in the cart
    // Add the item to cart and subtract from store's stock

    // If the item is already in the cart
    // Add to quantity and subtract from store's stock


    let indexExist = cartItems.findIndex((item) => {
      return item.id === product.id;
    });
  
    if (indexExist < 0) {
      let newCartItem = {
        id: product.id,
        quantity: 1,
      };
      setCartItems([...cartItems, newCartItem]);
    } else {
      let filteredCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return (item = { ...item, quantity: item.quantity + 1 });
        }
        return item;
      });
      setCartItems(filteredCartItems);
    }
  
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
  }
  
  function cartAddMore() {
    let filteredCartItems = cartItems.map((item) => {
      if (item.id === cartItem.id) {
        if (item.quantity > 5) {
          alert("no more stock");
          return (item = { ...item, quantity: 5 });
        } else {
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
    setProducts(filteredProducts);
  }
  
  function removeFromCart(
    cartItem,
    cartItems,
    products,
    setCartItems,
    setProducts
  ) {
    let filteredCartItems = cartItems.map((item) => {
      if (item.id === cartItem.id) {
        if (item.quantity <= 0) {
          return (item = { ...item, quantity: 0 });
        } else {
          return (item = {
            ...item,
            quantity: item.quantity - 1,
          });
        }
      }
      return item;
    });
  
    filteredCartItems = filteredCartItems.filter((item) => {
      return item.quantity !== 0;
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
    setProducts(filteredProducts);
  }
  

  return <div className="App">
    <Header products={products} setProducts = {setProducts} cartItems={cartItems} setCartItems ={setCartItems} />
    <Main products={products}  cartItems={cartItems} setCartItems={setCartItems} setProducts = {setProducts} />
  </div>;
}
