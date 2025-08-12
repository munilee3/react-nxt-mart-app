import {useEffect, useContext} from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'
import {FiHome} from 'react-icons/fi'
import {BsCart2} from 'react-icons/bs'
import {TbLogout2} from 'react-icons/tb'
import {BiLogOut} from 'react-icons/bi'
import Cookies from 'js-cookie'

import AppContext from '../../context/AppContext'

import './index.css'

const Header = () => {
  const context = useContext(AppContext)
  const varalible = useLocation()
  const navigate = useHistory()
  useEffect(() => {
    context.changeTab(varalible.pathname)
  }, [varalible])
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate.push('/login')
  }
  return (
    <AppContext.Consumer>
      {value => {
        const {activeTab} = value

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
                  <Link
                    to="/cart"
                    className={`${headerCartHighlight} nav-link`}
                  >
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
      }}
    </AppContext.Consumer>
  )
}
export default Header
