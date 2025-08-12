import {FiPlus, FiMinus} from 'react-icons/fi'

import AppContext from '../../context/AppContext'
import './index.css'

const CartItem = props => (
  <AppContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartItemDetails} = props
      const {id, name, weight, price, image, quantity} = cartItemDetails
      const onDecrementItem = () => {
        decrementCartItemQuantity(id)
      }
      const onIncrementItem = () => {
        incrementCartItemQuantity(id)
      }
      return (
        <>
          <li className="cart-item-container" data-testid="cartItem">
            <div className="image-cart-item-container">
              <img src={image} alt={name} className="cart-item-image" />
              <div className="name-weight-price-container">
                <p className="product-name">{name}</p>
                <p className="product-weight">{weight}</p>
                <p className="product-price">{price}</p>
              </div>
            </div>
            <div className="increment-decrement-container">
              <button
                type="button"
                className="decrement-button"
                onClick={onDecrementItem}
                aria-label="increment"
                data-testid="decrement-count"
              >
                <FiMinus className="decrement-icons" />
              </button>
              <p className="count" data-testid="active-count">
                {quantity}
              </p>
              <button
                type="button"
                className="decrement-button"
                onClick={onIncrementItem}
                aria-label="decrement"
                data-testid="increment-count"
              >
                <FiPlus className="decrement-icons" />
              </button>
            </div>
          </li>
          <hr className="horizontal-line" />
        </>
      )
    }}
  </AppContext.Consumer>
)

export default CartItem
