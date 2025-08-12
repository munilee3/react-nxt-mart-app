import {Component} from 'react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AppContext from './context/AppContext'

import './App.css'

class App extends Component {
  // state = {
  //   cartList: '',
  //   activeTab: '',
  //   activeCategory: '',
  // }

  // componentDidMount = () => {
  //   const getItemsFromLocalStorate =
  //     JSON.parse(localStorage.getItem('CartItems')) || []
  //   this.setState({cartList: getItemsFromLocalStorate})
  // }

  // changeTab = id => {
  //   this.setState({activeTab: id})
  // }

  // changeCategory = id => {
  //   this.setState({activeCategory: id})
  // }

  // addCartItem = product => {
  //   const newProduct = {...product, quantity: 1}
  //   this.setState(prevState => {
  //     const updatedCart = [...prevState.cartList, newProduct]
  //     localStorage.setItem('CartItems', JSON.stringify(updatedCart))
  //     return {cartList: updatedCart}
  //   })
  // }

  // removeCartItem = removeItem => {
  //   const {cartList} = this.state
  //   const filteredList = cartList.filter(eachItem => eachItem.id !== removeItem)
  //   localStorage.setItem('CartItems', JSON.stringify(filteredList))
  //   this.setState({cartList: filteredList})
  // }

  // incrementCartItemQuantity = id => {
  //   const {cartList} = this.state
  //   const filteredList = cartList.map(eachItem => {
  //     if (eachItem.id === id) {
  //       return {...eachItem, quantity: eachItem.quantity + 1}
  //     }
  //     return eachItem
  //   })
  //   localStorage.setItem('CartItems', JSON.stringify(filteredList))
  //   this.setState({cartList: filteredList})
  // }

  // decrementCartItemQuantity = id => {
  //   const {cartList} = this.state
  //   const cartItem = cartList.filter(eachItem => eachItem.id === id)
  //   const {quantity} = cartItem[0]
  //   if (quantity > 1) {
  //     const newCartList = cartList.map(eachItem => {
  //       if (eachItem.id === id) {
  //         return {...eachItem, quantity: eachItem.quantity - 1}
  //       }
  //       return eachItem
  //     })
  //     localStorage.setItem('CartItems', JSON.stringify(newCartList))
  //     this.setState({cartList: newCartList})
  //   } else {
  //     this.removeCartItem(id)
  //   }
  // }

  // removeAllCartItems = () => {
  //   this.setState({cartList: []})
  // }

  render() {
    // const {cartList, activeTab, activeCategory} = this.state
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
