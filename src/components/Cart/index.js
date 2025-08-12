import 'reactjs-popup/dist/index.css'
import {Link} from 'react-router-dom'
import {IoIosArrowRoundBack} from 'react-icons/io'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import EmptyCartView from '../EmptyCartView'
import PaymentSuccess from '../PaymentSuccess'
import AppContext from '../../context/AppContext'
import './index.css'

const Cart = () => (
  <AppContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      console.log(cartList)
      // console.log(localStorage.getItem('CartItems'))
      let totalPrice = 0
      if (cartList.length !== 0) {
        cartList?.forEach(eachItem => {
          const {price, quantity} = eachItem
          const newPrice = price.replace('₹', '')
          const itemPrice = newPrice * quantity
          totalPrice += itemPrice
        })
      }
      const cartCount = cartList?.length
      const onClearCart = () => {
        removeAllCartItems()
      }

      const renderPaymentView = () => <PaymentSuccess />
      // console.log(cartCount)
      return (
        <div className="nxt-mart-container">
          <div className="header">
            <Header />
          </div>
          <div className="cart-container">
            {cartCount === 0 ? (
              <EmptyCartView />
            ) : (
              <>
                <div className="back-arrow-checkout-container">
                  <Link to="/">
                    <IoIosArrowRoundBack className="back-arrow-icon" />
                  </Link>
                  <p className="checkout">Checkout</p>
                </div>
                <div className="product-details-checkout">
                  <h1 className="cart-items-heading">Items</h1>
                  <div className="product-details-checkout-container">
                    <div>
                      <p className="cart-items-count">
                        Items (<span>{cartCount}</span>)
                      </p>
                      <ul className="cart-list-container">
                        {cartList?.map(eachItem => (
                          <CartItem
                            cartItemDetails={eachItem}
                            key={eachItem.id}
                          />
                        ))}
                      </ul>
                    </div>
                    <div className="total-price-checkout-container">
                      <div className="total-price-container">
                        <h1 className="total-heading">
                          Total ({cartCount} items) :
                        </h1>
                        <p data-testid="total-price"> ₹ {totalPrice} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      )
    }}
  </AppContext.Consumer>
)

export default Cart
