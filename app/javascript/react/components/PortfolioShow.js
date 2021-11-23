import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

const PortfolioShow = props => {

  const [portfolio, setPortfolio] = useState({})

  let portfolioId = props.match.params.id

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/v1/portfolios/${portfolioId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setPortfolio(responseBody)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  return (
    <div className="show-container">
      <h1 className="portfolio-name">{portfolio.name}</h1>
      <SearchBar />
      <div className="current-holdings-container">
        <h3>Current Holdings</h3>
      </div>
    </div>
  )
}

export default PortfolioShow