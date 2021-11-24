import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CurrentHoldings from "./CurrentHolding"
import SearchBar from "./SearchBar"
import CurrentHolding from "./CurrentHolding"

const PortfolioShow = props => {

  const [portfolio, setPortfolio] = useState({})
  const [portfolioHoldings, setPortfolioHoldings] = useState([])
  const [errors, setErrors] = useState("")

  let portfolioId = props.match.params.id

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/v1/portfolios/${portfolioId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setPortfolio(responseBody.portfolio)
      setPortfolioHoldings(responseBody.holdings)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])
  
  const currentHoldings = portfolioHoldings.map(holding => {
    return (
      <CurrentHolding
        key={holding.id}
        holding={holding}
      />
    )
  })

  return (
    <div className="show-container">
      <h1 className="portfolio-name">{portfolio.name}</h1>
      {errors}
      <SearchBar
        portfolioId={portfolioId}
        portfolioHoldings={portfolioHoldings}
        setPortfolioHoldings={setPortfolioHoldings}
        setErrors={setErrors}
      />
      <div className="current-holdings-container">
        <h3>Current Holdings</h3>
        <table>
          {currentHoldings}
        </table>
      </div>
    </div>
  )
}

export default PortfolioShow