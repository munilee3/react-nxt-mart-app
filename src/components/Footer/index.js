import {ImFacebook2, ImTwitter} from 'react-icons/im'
import {FaPinterestSquare} from 'react-icons/fa'
import {SiInstagram} from 'react-icons/si'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="contact-social-container">
      <p className="contact-info">
        For any queries, contact +91-9876543210 or mail us help@nxtmart.co.in
      </p>
      <div className="social-media-container">
        <ImFacebook2 className="social-icons" />
        <FaPinterestSquare className="social-icons" />
        <ImTwitter className="social-icons" />
        <SiInstagram className="social-icons" />
      </div>
    </div>
    <p className="company-rights">
      Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd
    </p>
  </div>
)

export default Footer
