import {useState} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartData')) || [],
  )
  const [checkout, setCheckout] = useState(false)

  const incrementQty = id => {
    const updated = cartItems.map(item =>
      item.id === id ? {...item, quantity: item.quantity + 1} : item,
    )
    setCartItems(updated)
    localStorage.setItem('cartData', JSON.stringify(updated))
  }

  const decrementQty = id => {
    const updated = cartItems
      .map(item =>
        item.id === id ? {...item, quantity: item.quantity - 1} : item,
      )
      .filter(each => each.quantity > 0)
    setCartItems(updated)
    localStorage.setItem('cartData', JSON.stringify(updated))
  }

  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.price.replace('₹', '') * curr.quantity,
    0,
  )

  const onClickCheckOut = () => {
    setCheckout(true)
    localStorage.setItem('cartData', JSON.stringify([]))
  }

  if (checkout) {
    return (
      <div className="payment-success">
        <div>
          <Header />
        </div>
        <div className="payment-success-container">
          <img
            src="https://ik.imagekit.io/issupg3so/Group%207417.jpg?updatedAt=1751386682921"
            alt="success"
          />
          <h1 className="payment-heading">Payment Successful</h1>
          <p className="payment-para">
            Thank you for ordering.
            <br />
            Your payment is successfully completed.
          </p>
          <button
            type="button"
            onClick={() => window.location.replace('/')}
            className="return-to-home"
          >
            Return to Homepage
          </button>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <Header />
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <img
            alt="empty cart"
            src="https://ik.imagekit.io/issupg3so/Group%208.png?updatedAt=1751814276885"
          />
          <h1 className="empty-heading">Your cart is empty</h1>
        </div>
      ) : (
        <div className="cart-items-container">
          <h1 className="items-heading">Items</h1>
          <div className="cart-list-items-container">
            <ul className="cart-items">
              {cartItems.map(item => (
                <li
                  key={item.id}
                  data-testid="cartItem"
                  className="item-container"
                >
                  <div className="img-product-details-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="item-details">
                      <p className="name">{item.name}</p>
                      <p className="weight">{item.weight}</p>
                      <p className="price">{item.price}</p>
                    </div>
                  </div>
                  <div className="decrement-increment-buttons">
                    <button
                      data-testid="decrement-quantity"
                      type="button"
                      onClick={() => decrementQty(item.id)}
                      className="product-decrement-count"
                    >
                      -
                    </button>
                    <p data-testid="item-quantity" className="item-quantity">
                      {item.quantity}
                    </p>
                    <button
                      data-testid="increment-quantity"
                      type="button"
                      onClick={() => incrementQty(item.id)}
                      className="product-increment-count"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-price-conntainer">
              <h1 className="cart-total-price">{`Total (${cartItems.length} items) :`}</h1>
              <p data-testid="total-price" className="total-price">
                ₹{totalPrice}
              </p>
              <button
                type="button"
                onClick={onClickCheckOut}
                className="checkout-btn"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
export default Cart
