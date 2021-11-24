import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CurrentHoldings from "./CurrentHolding"
import SearchBar from "./SearchBar"
import CurrentHolding from "./CurrentHolding"

const PortfolioShow = props => {

  const [portfolio, setPortfolio] = useState({})
  const [portfolioHoldings, setPortfolioHoldings] = useState([])
  const [portfolioHoldingsData, setPortfolioHoldingsData] = useState([])
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
      setPortfolioHoldingsData(responseBody.stock_data)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])  
  
  let currentHoldings = []
  if (portfolioHoldings.length !== 0 && portfolioHoldingsData.length !== 0) {
    currentHoldings = portfolioHoldings.map((holding, index) => {
      return (
        <CurrentHolding
          key={holding.id}
          holding={holding}
          data={portfolioHoldingsData[index]}
        />
      )
    })
  }

  return (
    <div className="show-container">
      <h1 className="portfolio-name">{portfolio.name}</h1>
      {errors}
      <SearchBar
        portfolioId={portfolioId}
        portfolioHoldings={portfolioHoldings}
        setPortfolioHoldings={setPortfolioHoldings}
        portfolioHoldingsData={portfolioHoldingsData}
        setPortfolioHoldingsData={setPortfolioHoldingsData}
        setErrors={setErrors}
      />
      <div className="current-holdings-container">
        <h3>Current Holdings</h3>
        <table className="current-holdings-table">
          <tbody>
            <tr>
              <th>Symbol</th>
              <th>Price ($)</th>
              <th>Day change ($)</th>
              <th>Day change (%)</th>
            </tr>
            {currentHoldings}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PortfolioShow