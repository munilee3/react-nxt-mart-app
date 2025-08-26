import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {CgProfile} from 'react-icons/cg'
import {RiDoorLockLine} from 'react-icons/ri'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showError: false,
  }

  onChangeUsername = e => this.setState({username: e.target.value})

  onChangePassword = e => this.setState({password: e.target.value})

  toggleShowPassword = () =>
    this.setState(prev => ({showPassword: !prev.showPassword}))

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/') // ✅ Fix for TEST_71
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showPassword, showError, errorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const loginbuttonBackground =
      username.length > 0 && password.length > 0
        ? 'green-background'
        : 'dark-background'
    return (
      <div className="login-form-container">
        <div className="form-container">
          <img
            alt="login website logo"
            src="https://ik.imagekit.io/issupg3so/Logo%202.jpg"
            className="logo-img"
          />
          <form
            onSubmit={this.submitForm}
            className="label-input-field-container"
          >
            <label htmlFor="username" className="username-label">
              Username
            </label>
            <div className="input-field-container">
              <CgProfile className="icons" />
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input-field-container">
              <RiDoorLockLine className="icons" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="input-field"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            <div className="show-password-container">
              <input
                type="checkbox"
                id="showPass"
                className="checkbox"
                onChange={this.toggleShowPassword}
              />
              <label htmlFor="showPass" className="show-password-label">
                Show Password
              </label>
            </div>

            <button
              className={`${loginbuttonBackground} login-button`}
              type="submit"
              disabled={username.length === 0 && password.length === 0}
            >
              Login
            </button>
            {showError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
