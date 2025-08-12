import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-container">
      <img
        src="https://ik.imagekit.io/issupg3so/Group%207520.jpg?updatedAt=1751206419677"
        alt="not-found"
        className="not-found-img"
      />
      <h1>Page Not Found.</h1>
      <p>We are sorry, the page you requested could not be found.</p>
    </div>
    <div className="header">
      <Header />
    </div>
  </>
)

export default NotFound
