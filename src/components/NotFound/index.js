import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found</p>
    <Link to="/">Go Back Home</Link>
  </div>
)

export default NotFound
