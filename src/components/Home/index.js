import {useLocation} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Categories from '../Categories'
import CategoryWithProductDetails from '../CategoryWithProductDetails'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    products: [],
    apiStatus: apiStatusConstants.initial,
    path: '',
  }

  componentDidMount() {
    this.getPorducts()
    this.getPath()
  }

  getPath = () => {
    const path = window.location.href
    const queryPath = path?.split('#')
    const purePathArray = queryPath[1]?.split('%20')
    const purePath = purePathArray?.join(' ')
    this.setState({path: purePath})
  }

  getPorducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        products: fetchedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-container">
      <div className="header">
        <Header />
      </div>
      <div className="product-loader-container">
        <Loader
          type="ThreeDots"
          color="rgba(8, 140, 3, 1)"
          height="50"
          width="50"
        />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )

  renderFailureView = () => (
    <>
      <div className="failure-container">
        <img
          src="https://ik.imagekit.io/issupg3so/Group%207519.jpg?updatedAt=1751437704200"
          alt="failure"
          className="failure-image"
          data-testid="failure view"
        />
        <h1>Oops! Something went wrong</h1>
        <p className="failure-para">We are having some trouble</p>
        <button type="button" className="retry-button">
          Retry
        </button>
      </div>
      <div className="header">
        <Header />
      </div>
    </>
  )

  renderProductsListView = () => {
    const {products, path} = this.state
    const allCategory = products.categories[0].name
    return (
      <div className="nxt-mart-container">
        <div className="header">
          <Header />
        </div>
        <div className="nxt-mart-categories-products-container">
          <ul className="product-list-container">
            <li className="category-title">Categories</li>
            <li className="category-item">
              <a className="category-button" href={`#${allCategory}`}>
                All
              </a>
            </li>
            {products.categories.map(eachProduct => (
              <Categories
                categoryDetails={eachProduct}
                key={eachProduct.name}
              />
            ))}
          </ul>
          <ul className="category-with-products">
            {products.categories.map(eachCategory => (
              <CategoryWithProductDetails
                productItems={eachCategory}
                key={eachCategory.name}
              />
            ))}
          </ul>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllProducts()}</>
  }
}

export default Home
