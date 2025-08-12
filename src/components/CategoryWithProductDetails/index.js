import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

import ProductDetails from '../ProductDetails'
import './index.css'

const CategoryWithProductDetails = props => {
  const {productItems} = props
  const {name, products} = productItems

  return (
    <li className="category-product-container" id={name}>
      <div className="category-button-container">
        <div className="category-name-arrow-container">
          <h1>{name}</h1>
          <MdOutlineKeyboardArrowRight className="arrow-icon" />
        </div>
        <button type="button" className="view-all-button">
          View all
        </button>
      </div>
      <div>
        <ul className="product-details-container">
          {products.map(eachProduct => (
            <ProductDetails productDetails={eachProduct} key={eachProduct.id} />
          ))}
        </ul>
      </div>
    </li>
  )
}

export default CategoryWithProductDetails
