import {FiPlus, FiMinus} from 'react-icons/fi'

import AppContext from '../../context/AppContext'
import './index.css'

const ProductDetails = props => (
  <AppContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        addCartItem,
        cartList,
      } = value
      const {productDetails} = props
      const {id, name, weight, price, image} = productDetails
      const isAlreadyExists = cartList?.find(
        eachProduct => eachProduct.id === id,
      )
      const onClickAddProduct = () => {
        addCartItem(productDetails)
      }
      const onDecrementCartItem = () => {
        decrementCartItemQuantity(id)
      }
      const onIncrementCartItem = () => {
        incrementCartItemQuantity(id)
      }
      return (
        <li className="product-details">
          <img src={image} alt={id} className="product-image" />
          <div className="product-detail">
            <p className="product-name">{name}</p>
            <p className="product-weight">{weight}</p>
            <div className="price-add-container">
              <p className="product-price">{price}</p>
              <div>
                {isAlreadyExists === undefined ? (
                  <button
                    type="button"
                    className="add-button"
                    onClick={onClickAddProduct}
                  >
                    Add
                  </button>
                ) : (
                  <div className="increment-decrement-container">
                    <button
                      type="button"
                      className="decrement-button"
                      onClick={onDecrementCartItem}
                      aria-label="increment"
                      data-testid="decrement-count"
                    >
                      <FiMinus className="decrement-icons" />
                    </button>
                    <p className="count" data-testid="active-count">
                      {isAlreadyExists.quantity}
                    </p>
                    <button
                      type="button"
                      className="decrement-button"
                      onClick={onIncrementCartItem}
                      aria-label="decrement"
                      data-testid="increment-count"
                    >
                      <FiPlus className="decrement-icons" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </li>
      )
    }}
  </AppContext.Consumer>
)

export default ProductDetails
