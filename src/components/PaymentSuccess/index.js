import {Link} from 'react-router-dom'
import './index.css'

const PaymentSuccess = () => (
  <div className="payment-success-container">
    <img
      src="https://ik.imagekit.io/issupg3so/Group%207417.jpg?updatedAt=1751386682921"
      alt="success"
    />
    <h1 className="payment-heding">Payment Successful</h1>
    <p className="payment-para">
      Thank you for ordering.
      <br />
      Your payment is successfully completed.
    </p>
    <Link to="/" className="return-to-homepage-button">
      <button type="button">Return to Homepage</button>
    </Link>
  </div>
)

export default PaymentSuccess
