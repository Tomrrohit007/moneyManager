import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordContainer from '../PasswordContainer/index'
import './index.css'

class MainApp extends Component {
  state = {
    searchq: '',
    website: '',
    username: '',
    password: '',
    passwordList: [],
    isCheckChecked: false,
  }

  onSubmit = () => {
    const {website, username, password} = this.state
    const newItem = {
      id: uuidv4(),
      website,
      password,
      username,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newItem],
      website: '',
      password: '',
      username: '',
    }))
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  deleteTheItem = id => {
    const {passwordList} = this.state
    const updatedList = passwordList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordList: updatedList})
  }

  onRenderPassword = () => {
    const {passwordList, isCheckChecked, searchq} = this.state
    const filterList = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchq.toLowerCase()),
    )
    return (
      <ul className="password-store">
        {filterList.map(eachItem => (
          <PasswordContainer
            eachItem={eachItem}
            isCheckChecked={isCheckChecked}
            deleteTheItem={this.deleteTheItem}
            key={eachItem.id}
          />
        ))}
      </ul>
    )
  }
  isCheckboxChecked = () => {
    this.setState(prevState => ({isCheckChecked: !prevState.isCheckChecked}))
  }

  searchInput = event => {
    this.setState({searchq: event.target.value})
  }

  render() {
    const {website, password, username, passwordList} = this.state

    const noPassword = () => {
      return (
        <div className="no-assword">
          <img
            className="store-img"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="No Passwords"
          />
          <p className="no-pass">No Passwords</p>
        </div>
      )
    }

    let count = 0
    count = passwordList.length

    return (
      <div className="main-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="upper-card">
          <form className="form" onSubmit={this.onSubmit}>
            <h1 className="add-password-text" htmlFor="form">
              Add New Password
            </h1>
            <div className="website">
              <img
                className="icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt=""
              />
              <input
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="website">
              <img
                className="icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt=""
              />
              <input
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="website">
              <img
                className="icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt=""
              />
              <input
                placeholder="Enter Password"
                type="password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="btn" type="submit">
              Add
            </button>
          </form>
          <img
            className="upper-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="bottom-card">
          <div className="upper-area">
            <div className="contt">
              <h1 className="heading">Your Passwords </h1>
              <p className="count">{count}</p>
            </div>
            <div className="search-cont">
              <img
                className="icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt=""
              />
              <input
                className="search-input"
                placeholder="search"
                type="search"
                onChange={this.searchInput}
              />
            </div>
          </div>

          <div className="bottom-area">
            <hr />
            <div className="show-password">
              <input
                type="checkbox"
                className="checkbox"
                id="checkboxInput"
                onChange={this.isCheckboxChecked}
              />
              <label htmlFor="checkboxInput" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {count > 0 ? this.onRenderPassword() : noPassword()}
          </div>
        </div>
      </div>
    )
  }
}

export default MainApp
