import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {

  return (
    <div className="navbar">
      <div className="site-title">
        <Link to="/">
          Stock Tracker
        </Link>
      </div>
      <div className="header-links-wrapper">
        <ul className="header-links">
          <li className="link-wrapper">
            <Link to="/about">
              About
            </Link>
          </li>
          <li className="link-wrapper">
            <Link to="/create">
              Create
            </Link>
          </li>
          <li className="link-wrapper">
            <Link to="/users/sign_in">
              Sign In
            </Link>
          </li>
          <li className="link-wrapper">
            <Link to="/users/sign_up">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar