import { createContext, useState, useEffect } from "react";

const adddCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) =>
   cartItem.id === productToAdd.id 

  )
  // If found, increment quantity
  if(existingCartItem) {
    return cartItems.map((cartItem)=> 
    cartItem.id === productToAdd.id
    ? {...cartItem, quantity: cartItem.quantity +1}
    : cartItem
  )
  }
 
  // Returm new array with modified cartItems/ new cart item
  return [...cartItems,{...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
  // find the cart item to remove 
  const existingCartItem = cartItems.find((cartItem) =>
  cartItem.id === productToRemove.id)
  // check if the quantity is equal to 1, if so, remove it from the cart
  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
  }
  //return back cartItems with matching cartItems with needed quantity
  return cartItems.map((cartItem) => 
    cartItem.id === productToRemove.id
    ? {...cartItem, quantity: cartItem.quantity -1} 
    : cartItem
  )
}

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart:() => {},
  clearItemToCart:() =>{},
  cartCount: 0,
  cartTotal: 0,
})


// create a provider 
export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // Update the quantity
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  },[cartItems])

  // Price Total 
  useEffect(()=> {
    const newCartPrice = cartItems.reduce((total,cartItem)=> total + cartItem.price * cartItem.quantity,0)
    setCartTotal(newCartPrice)
  },[cartItems])

  // Add items to cart 
  const addItemToCart = (productToAdd) => {
    setCartItems(adddCartItem(cartItems, productToAdd))
  }

  // Remove Item to cart
  const removeItemToCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems,productToRemove))
 }

  // Clear Item to cart
  const clearItemToCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear))
 }
  

  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemToCart,   clearItemToCart,cartCount, cartTotal}
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}