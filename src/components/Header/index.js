// import {Link, withRouter} from 'react-router-dom'
// import Cookies from 'js-cookie'

// const Header = props => {
//   const onLogout = () => {
//     Cookies.remove('jwt_token')
//     const {history} = props
//     history.replace('/login')
//   }
//   return (
//     <nav className="header-large-container">
//       <Link to="/">
//         <img
//           src="https://ik.imagekit.io/issupg3so/Logo%201.png"
//           alt="website logo"
//         />
//       </Link>

//       <ul className="nav-menu">
//         <li className="nav-menu-item" onClick={onChangeHomeTab}>
//           <Link to="/" className={`${headerHomeHighlight} nav-link`}>
//             Home
//           </Link>
//         </li>
//         <li className="nav-menu-item" onClick={onChangeCartTab}>
//           <Link to="/cart" className={`${headerCartHighlight} nav-link`}>
//             Cart
//           </Link>
//         </li>
//       </ul>
//       <div className="logout-button">
//         <BiLogOut className="logout-icon" />
//         <button type="button" className="logout-btn">
//           Logout
//         </button>
//       </div>

//       <ul className="nav-menu">
//         <li className="nav-menu-item">
//           <Link to="/">Home</Link>
//         </li>
//         <li className="nav-menu-item">
//           <Link to="/cart">Cart</Link>
//         </li>
//       </ul>
//       <button className="logout-button" type="button" onClick={onLogout}>
//         Logout
//       </button>
//     </nav>
//   )
// }

import {useEffect, useState} from 'react'
import {Link, useLocation, useHistory, withRouter} from 'react-router-dom'
import {FiHome} from 'react-icons/fi'
import {BsCart2} from 'react-icons/bs'
import {TbLogout2} from 'react-icons/tb'
import {BiLogOut} from 'react-icons/bi'
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const varalible = useLocation()
  const navigate = useHistory()
  const [activeTab, setActiveTab] = useState('')
  useEffect(() => {
    setActiveTab(varalible.pathname)
  }, [varalible])
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate.push('/login')
  }

  const headerHomeHighlight = activeTab === '/' ? 'active-tab' : ''
  const headerCartHighlight = activeTab === '/cart' ? 'active-tab' : ''
  return (
    <>
      <nav className="header-container">
        <Link to="/">
          <FiHome className={`${headerHomeHighlight} icons`} />
        </Link>
        <Link to="/cart">
          <BsCart2 className={`${headerCartHighlight} icons`} />
        </Link>
        <TbLogout2 onClick={onClickLogout} className="icons" />
      </nav>
      <nav className="header-large-container">
        <Link to="/">
          <img
            src="https://ik.imagekit.io/issupg3so/Logo%201.png?updatedAt=1751558163318"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className={`${headerHomeHighlight} nav-link`}>
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/cart" className={`${headerCartHighlight} nav-link`}>
              Cart
            </Link>
          </li>
          <li className="logout-button">
            <BiLogOut className="logout-icon" />
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
