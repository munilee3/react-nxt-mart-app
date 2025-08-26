import './index.css'

const ProductItem = props => {
  const {
    addCartItem,
    product,
    decrementCartItemQuantity,
    incrementCartItemQuantity,
    cartList,
  } = props
  const {id, image, name, weight, price} = product

  const isAlreadyExists = cartList?.find(eachProduct => eachProduct.id === id)

  const onClickAddtoCartItem = () => {
    addCartItem(product)
  }

  const onDecrementCartItem = () => {
    decrementCartItemQuantity(id)
  }

  const onIncremtnCartItem = () => {
    incrementCartItemQuantity(id)
  }

  return (
    <div data-testid="product" className="product">
      <img src={image} alt={name} width="130px" height="135px" />
      <div className="product-details-containers">
        <div className="name-weight-price">
          <p className="product-name">{name.split(',')[0]}</p>
          <p className="product-weight">{weight}</p>
          <p className="product-price">{price}</p>
        </div>
        <div className="add-add-shift-buttons">
          {isAlreadyExists === undefined ? (
            <button
              type="button"
              onClick={onClickAddtoCartItem}
              className="add-buttons"
            >
              Add
            </button>
          ) : (
            <div className="decrement-increment-contianer">
              <button
                type="button"
                data-testid="decrement-count"
                onClick={onDecrementCartItem}
                className="product-decrement-count"
              >
                -
              </button>
              <p data-testid="active-count" className="product-quantity">
                {isAlreadyExists.quantity}
              </p>
              <button
                type="button"
                data-testid="increment-count"
                onClick={onIncremtnCartItem}
                className="product-increment-count"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductItem
