
import { useState } from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import inititalStoreFoods from "./storeinfo"

import "./styles/index.css";


export default function App() {

const [products, setProducts]= useState(inititalStoreFoods)
const [cartItems, setCartItems] = useState([])
// const [totalPrice, setTotalPrice] = useState(0.0); because we can just calculate it 

  return <div className="App">
    <Header products={products} setProducts = {setProducts} cartItems={cartItems} setCartItems ={setCartItems} />
    <Main products={products}  cartItems={cartItems} setCartItems={setCartItems} setProducts = {setProducts} />
  </div>;
}
