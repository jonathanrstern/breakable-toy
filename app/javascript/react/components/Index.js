import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import FetchFromAPI from "./FetchFromAPI"
import NavBar from "./NavBar"
import SearchBar from "./SearchBar"

const Index = () => {

  const scrollToBottom = () => {
    window.scrollTo({
      top: 1000,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="landing-page-container">
      <h1 className="landing-page-text">Keep track of your portfolio</h1>
      <h3 className="landing-page-subtext">
        Real time quotes, the latest news, and comparisons with the top investors in the world
      </h3>
      <a href="/portfolios/new">
        <button className="landing-page-cta">
          Create a portfolio
        </button>
      </a>
    </div>
  )
}

export default Index