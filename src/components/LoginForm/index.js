import {Component} from 'react'
import Cookies from 'js-cookie'
import {CgProfile} from 'react-icons/cg'
import {RiDoorLockLine} from 'react-icons/ri'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isShowPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
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
      </>
    )
  }

  renderPasswordField = () => {
    const {password, isShowPassword} = this.state

    return (
      <>
        <label htmlFor="password" className="password-label">
          Password
        </label>
        <div className="input-field-container">
          <RiDoorLockLine className="icons" />
          <input
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            className="input-field"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
      </>
    )
  }

  render() {
    const {
      showSubmitError,
      errorMsg,
      isShowPassword,
      username,
      password,
    } = this.state
    const loginbuttonBackground =
      username.length > 0 && password.length > 0
        ? 'green-background'
        : 'dark-background'
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://ik.imagekit.io/issupg3so/Logo%202.jpg?updatedAt=1751190479594"
            className="logo-img"
            alt="login website logo"
          />
          <div className="label-input-field-container">
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
          </div>
          <div className="label-input-field-container">
            <label htmlFor="password" className="password-label">
              Password
            </label>
            <div className="input-field-container">
              <RiDoorLockLine className="icons" />
              <input
                type={isShowPassword ? 'text' : 'password'}
                id="password"
                className="input-field"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
          </div>
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              className="checkbox"
              checked={isShowPassword}
              onChange={this.onChangeShowPassword}
            />
            <label htmlFor="showPassword" className="show-password-label">
              Show Password
            </label>
          </div>

          <button
            className={`${loginbuttonBackground} login-button`}
            type="submit"
          >
            Login
          </button>
          {showSubmitError && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
