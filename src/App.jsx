
import { useEffect, useState } from "react";

import Main from "./components/Main";
import Header from "./components/Header";

import "./styles/index.css";


export default function App() {
  const [products, setProducts]= useState([])
  const [cartItems, setCartItems] = useState([])

  // const [totalPrice, setTotalPrice] = useState(0.0); because we can just calculate it 
function getStoreInfo(){
 return fetch('http://localhost:4000/store').then(resp=>resp.json())
}

function getCartInfo(){
  return fetch('http://localhost:4000/cart').then(resp=>resp.json())
 }

function addCartItemToServer(object){
  let updatedCart = cartItems.find(cart=>cart.id===object.id)
  let updatedProduct = products.find(product=>product.id===object.id)
  let updatedProductId = updatedProduct.id
  if(updatedCart&&updatedCart.quantity>=5){
    alert('no more stock')
    return
  }
  if(updatedCart&&updatedCart.quantity<5){
    let updatedCartId= updatedCart.id
    return (fetch(`http://localhost:4000/cart/${updatedCartId}`,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        quantity: updatedCart.quantity+1
      })
      }).then(resp=>resp.json())).then((cartIteFromServer)=>{
        let filteredCartItems = cartItems.map((item)=>{
          if(item.id===cartIteFromServer.id){
            return {...item, quantity:cartIteFromServer.quantity }
          } return item
        })
        setCartItems(filteredCartItems)
        fetch(`http://localhost:4000/store/${updatedProductId}`,{
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            amount: updatedProduct.amount-1
          })
        }).then(resp=>resp.json()).then(productFromServer=>{
          let filteredProducts = products.map((item)=>{
            if(item.id===productFromServer.id){
              return {...item, amount:productFromServer.amount }
            } return item
          })
          setProducts(filteredProducts)
        })
      })
  }else{
  return fetch('http://localhost:4000/cart',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(object)
    }).then(resp=>resp.json()).then((cartIteFromServer)=>{
      let filteredCartItems = [...cartItems, cartIteFromServer]
      setCartItems(filteredCartItems)
      fetch(`http://localhost:4000/store/${updatedProductId}`,{
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            amount: updatedProduct.amount-1
          })
        }).then(resp=>resp.json()).then(productFromServer=>{
          let filteredProducts = products.map((item)=>{
            if(item.id===productFromServer.id){
              return {...item, amount:productFromServer.amount }
            } return item
          })
          setProducts(filteredProducts)

        })
    })
}
}

function reduceCartItemToServer(object){
  let updatedCart = cartItems.find(cart=>cart.id===object.id)
  let updatedCartId= updatedCart.id
  let updatedProduct = products.find(product=>product.id===object.id)
 
  if(updatedCart.quantity>=2){
    return (fetch(`http://localhost:4000/cart/${updatedCartId}`,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        quantity: updatedCart.quantity-1
      })
      }).then(resp=>resp.json())).then((cartIteFromServer)=>{
        let filteredCartItems = cartItems.map((item)=>{
          if(item.id===cartIteFromServer.id){
            return {...item, quantity:cartIteFromServer.quantity }
          } return item
        })
        setCartItems(filteredCartItems)

        fetch(`http://localhost:4000/store/${updatedCartId}`,{
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            amount: updatedProduct.amount+1
          })
        }).then(resp=>resp.json()).then(productFromServer=>{
          let filteredProducts = products.map((item)=>{
            if(item.id===productFromServer.id){
              return {...item, amount:productFromServer.amount }
            } return item
          })
          setProducts(filteredProducts)
        })

      })
  }else{
  return fetch(`http://localhost:4000/cart/${updatedCartId}`,{
    method:'DELETE'
    }).then(()=>{
      let filteredCartItems = cartItems.filter(item=>item.id !==updatedCartId)
      setCartItems(filteredCartItems)
      
      fetch(`http://localhost:4000/store/${updatedCartId}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          amount: updatedProduct.amount+1
        })
      }).then(resp=>resp.json()).then(productFromServer=>{
        let filteredProducts = products.map((item)=>{
          if(item.id===productFromServer.id){
            return {...item, amount:productFromServer.amount }
          } return item
        })
        setProducts(filteredProducts)
      })


    })    
  }
}


  useEffect(()=>{getStoreInfo().then(productsFromServer=>{
    setProducts(productsFromServer)
    getCartInfo().then(cartItemsFromServer=>setCartItems(cartItemsFromServer))
  })}, [])
  
  // useEffect(()=>{getCartInfo().then(cartItemsFromServer=>setCartItems(cartItemsFromServer))}, [])

  function addToCart(product) {
    let foundItem = cartItems.find((item) => {
      return item.id === product.id;
    });

    // If the item is already in the cart
    // Add to quantity and subtract from store's stock
    if (foundItem) {
      let filteredCartItems = cartItems.map((item) => {
        if (item.id === foundItem.id) {
          return (item = { ...item, quantity: item.quantity + 1 });
        }
        return item;
      });
      setCartItems(filteredCartItems);
    } else {
    // If the item is not in the cart
    // Add the item to cart and subtract from store's stock
      let newCartItem = {
        id: product.id,
        quantity: 1,
      };
      setCartItems([...cartItems, newCartItem]);
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
  
  function removeFromCart(cartItem) {
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
  
  let total = 0;
  for (const cartItem of cartItems) {
    let targetProduct = products.find((product) => {
      return product.id === cartItem.id;
    });
    if(targetProduct){
      total = total + targetProduct.price * cartItem.quantity
    }
  }

  return <div className="App">
    <Header products={products} addCartItemToServer={addCartItemToServer}  setProducts={ setProducts}/>
    <Main cartItems={cartItems} total={total} products={products} addCartItemToServer={addCartItemToServer} reduceCartItemToServer={reduceCartItemToServer}/>
  </div>;
}
