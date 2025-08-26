import {Component, createRef} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

import Header from '../Header'
import Footer from '../Footer'
import ProductItem from '../ProductItem'

import './index.css'

class Home extends Component {
  state = {
    categories: [],
    activeStatus: 'LOADING',
    cartList: [],
    activeCategory: localStorage.getItem('selectedCategory') || null,
  }

  componentDidMount() {
    const getItemsFromLocalStorate =
      JSON.parse(localStorage.getItem('cartData')) || []
    const getActiveCategory = JSON.parse(localStorage.getItem('category')) || ''
    this.setState({
      cartList: getItemsFromLocalStorate,
      activeCategory: getActiveCategory,
    })
    this.getCategories()
  }

  getCategories = async () => {
    this.setState({activeStatus: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')
    const {activeCategory} = this.state
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(
      'https://apis2.ccbp.in/nxt-mart/category-list-details',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      this.sectionRefs = {}
      const categoryies = data.categories
      categoryies.forEach(each => {
        this.sectionRefs[each.name] = createRef()
      })

      this.setState(
        {
          categories: data.categories,
          activeStatus: 'SUCCESS',
          activeCategory: activeCategory || categoryies[0]?.name,
        },
        () => {
          if (
            activeCategory &&
            this.sectionRefs[activeCategory] &&
            this.sectionRefs[activeCategory].current
          ) {
            this.sectionRefs[activeCategory].current.scrollIntoView({
              behavior: 'auto',
              block: 'start',
            })
          }
        },
      )
    } else {
      this.setState({activeStatus: 'FAILURE'})
    }
  }

  addCartItem = product => {
    this.setState(prevState => {
      const existingProduct = prevState.cartList?.find(
        eachItem => eachItem.id === product.id,
      )

      let updatedCart
      if (existingProduct) {
        updatedCart = prevState.cartList.map(eachItem =>
          eachItem.id === product.id
            ? {...eachItem, quantity: eachItem.quantity + 1}
            : eachItem,
        )
      } else {
        const newProduct = {...product, quantity: 1}
        updatedCart = [...prevState.cartList, newProduct]
      }

      localStorage.setItem('cartData', JSON.stringify(updatedCart))
      return {cartList: updatedCart}
    })
  }

  removeCartItem = removeItem => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachItem => eachItem.id !== removeItem)
    localStorage.setItem('cartData', JSON.stringify(filteredList))
    this.setState({cartList: filteredList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const filteredList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(filteredList))
    this.setState({cartList: filteredList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.filter(eachItem => eachItem.id === id)
    const {quantity} = cartItem[0]
    if (quantity > 1) {
      const newCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      })
      localStorage.setItem('cartData', JSON.stringify(newCartList))
      this.setState({cartList: newCartList})
    } else {
      this.removeCartItem(id)
    }
  }

  onChangeCategory = category => {
    this.setState({activeCategory: category})
    localStorage.setItem('selectedCategory', category)
    if (this.sectionRefs[category] && this.sectionRefs[category].current) {
      this.sectionRefs[category].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  renderSuccess = () => {
    const {categories, cartList, activeCategory} = this.state
    return (
      <div className="home-page">
        <div className="product-list-container">
          <h1 className="category-heading">Categories</h1>
          {categories.map(each => (
            <button
              type="button"
              key={each.name}
              className={`category-btn ${
                activeCategory === each.name ? 'active-category' : ''
              }`}
              onClick={() => this.onChangeCategory(each.name)}
            >
              {each.name}
            </button>
          ))}
        </div>
        <div className="content">
          {categories.map(product => (
            <div className="category-name-products-container">
              <div
                className="category-button-container"
                id={product.name}
                key={product.name}
                ref={this.sectionRefs[product.name]}
              >
                <div className="category-name-arrow-container">
                  <h1>{product.name}</h1>
                  <MdOutlineKeyboardArrowRight size={26} />
                </div>
                <button type="button" className="view-all-button">
                  View all
                </button>
              </div>
              <div className="product-details-container">
                {product.products.map(each => (
                  <ProductItem
                    key={each.id}
                    product={each}
                    addCartItem={this.addCartItem}
                    decrementCartItemQuantity={this.decrementCartItemQuantity}
                    incrementCartItemQuantity={this.incrementCartItemQuantity}
                    cartList={cartList}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        alt="failure view"
        src="https://ik.imagekit.io/issupg3so/Group%207519.jpg?updatedAt=1751437704200"
        className="failure-img"
      />
      <h1>Oops! Something went wrong.</h1>
      <p>We are having some trouble.</p>
      <button type="button" onClick={this.getCategories} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="ThreeDots" width="50" height="50" />
    </div>
  )

  renderAllProducts = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      case 'LOADING':
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="page-container">
        <div>
          <Header />
        </div>
        {this.renderAllProducts()}
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
