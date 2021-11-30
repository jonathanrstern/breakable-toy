import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import CurrentHolding from "./CurrentHolding"

const PortfolioShow = props => {
  const [portfolio, setPortfolio] = useState({})
  const [portfolioHoldings, setPortfolioHoldings] = useState([])
  const [portfolioHoldingsData, setPortfolioHoldingsData] = useState([])
  const [errors, setErrors] = useState("")

  const [isFetching, setIsFetching] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const [portfolioName, setPortfolioName] = useState("")
  
  const handleInputChange = event => {
    setPortfolioName(event.currentTarget.value)
  }

  let portfolioId = props.match.params.id

  const fetchPortfolio = async () => {
    setIsFetching(true)
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
      setIsFetching(false)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const updateSetter = async () => {
    setIsUpdating(true)
  }

  const updatePortfolioName = async () => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/portfolios/${portfolioId}`, {
        credentials: "same-origin",
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(portfolioName)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      if (responseBody.error) {
        setErrors(responseBody.error)
      } else {
        setPortfolio(responseBody)
        setIsUpdating(false)
        setErrors("")
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }
  
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

  let ctaMessage = <div></div>
  if (portfolioHoldingsData.length === 0) {
    ctaMessage = <div className="cta-message">Your portfolio is empty 🙁 <br/> You should add some stocks!</div>
  }

  if (isFetching === true) {
    return (
      <div className="loading-container">
        <img className="spinning-radial" src="https://miro.medium.com/max/1400/0*ptDX0HfJCYpo9Pcs.gif" />
        <p className="loading-verbiage">Pinging Wall Street... just a second!</p>
      </div>
    )
  } else {
    if (isUpdating === true) {
      return (
        <div className="show-container">
        <div className="errors">
          {errors}
        </div>
        <form onSubmit={updatePortfolioName} className="new-portfolio-name-form">
          <div className="label-and-input">
            <label className="new-form-label" htmlFor="name">
              New portfolio name:
            </label>
            <input id="new-portfolio-input" className="input" type="text" name="name" placeholder={portfolio.name} onChange={handleInputChange} value={portfolioName} />
          </div>
          <input className="update-button button" type="submit" value="Update portfolio name" />
        </form>

        <div className="current-holdings-container">
          <h3>Current Holdings</h3>
          <table className="current-holdings-table">
            <tbody>
              <tr className="column-headers">
                <th className="ticker-column">Symbol</th>
                <th className="ticker-column-data-header">Price</th>
                <th className="ticker-column-data-header">Chg ($)</th>
                <th className="ticker-column-data-header">Chg (%)</th>
                <th className="ticker-column-data-header">Open</th>
                <th className="ticker-column-data-header">High</th>
                <th className="ticker-column-data-header">Low</th>
              </tr>
              {currentHoldings}
            </tbody>
          </table>
          {ctaMessage}
        </div>
      </div>
      )
    } else {
      return (
        <div className="show-container">
          <div className="name-container">
            <h1 className="portfolio-name">{portfolio.name}</h1>
            <div onClick={updateSetter} className="update-button button">
              Update Portfolio Name
            </div>
          </div>
          <div className="errors">
            {errors}
          </div>
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
                <tr className="column-headers">
                  <th className="ticker-column">Symbol</th>
                  <th className="ticker-column-data-header">Price</th>
                  <th className="ticker-column-data-header">Chg ($)</th>
                  <th className="ticker-column-data-header">Chg (%)</th>
                  <th className="ticker-column-data-header">Open</th>
                  <th className="ticker-column-data-header">High</th>
                  <th className="ticker-column-data-header">Low</th>
                </tr>
                {currentHoldings}
              </tbody>
            </table>
            {ctaMessage}
          </div>
        </div>
      )
    }
  }

}

export default PortfolioShow