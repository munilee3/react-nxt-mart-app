import React from 'react'

const AppContext = React.createContext({
  cartList: JSON.parse(localStorage.getItem('CartItems')) || [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  activeTab: '',
  changeTab: () => {},
  removeAllCartItems: () => {},
  activeCategory: 'All',
  changeCategory: () => {},
})

export default AppContext
