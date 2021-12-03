import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import FetchFromAPI from "./FetchFromAPI"
import NavBar from "./NavBar"
import SearchBar from "./SearchBar"
import TopInvestor from "./TopInvestor"
import downButton from "../../../assets/images/down-button.jpg"
import Buffett from "../../../assets/images/Buffett.jpg"
import Soros from "../../../assets/images/Soros.jpg"
import Jones from "../../../assets/images/Jones.jpg"
import Druckenmiller from "../../../assets/images/Druckenmiller.jpg"
import Marks from "../../../assets/images/Marks.jpg"
import Cohen from "../../../assets/images/Cohen.jpg"

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

      <div className="down-button">
        <img onClick={scrollToBottom} src={downButton} />
      </div>

      <div className="top-investors">
        <h2 className="landing-page-text two">Compare your portfolio with the best in the world:</h2>
        <TopInvestor
          key="1"
          id="1"
          name="Warren Buffett"
          fund="Berkshire Hathaway"
          photo_url={Buffett}
        />
        <TopInvestor
          key="2"
          id="2"
          name="George Soros"
          fund="Soros Fund Management"
          photo_url={Soros}
        />
        <TopInvestor
          key="3"
          id="3"
          name="Paul Tudor Jones"
          fund="Tudor Investment Corporation"
          photo_url={Jones}
        />
        <TopInvestor
          key="4"
          id="4"
          name="Steve Cohen"
          fund="Point72"
          photo_url={Cohen}
        />
        <TopInvestor
          key="5"
          id="5"
          name="Stanley Druckenmiller"
          fund="Duquesne Family Office"
          photo_url={Druckenmiller}
        />
        <TopInvestor
          key="6"
          id="6"
          name="Howard Marks"
          fund="Oaktree Capital"
          photo_url={Marks}
        />
      </div>
    </div>
  )
}

export default Index