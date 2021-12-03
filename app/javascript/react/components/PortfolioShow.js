import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import CurrentHolding from "./CurrentHolding"
import { generateSlug } from "random-word-slugs"
import spinner from "../../../assets/images/spinner.gif"
import reloadIcon from "../../../assets/images/reload.jpg"

let slug = `${generateSlug(2, { format: "title" })}'s Portfolio`

const PortfolioShow = props => {
  const [portfolio, setPortfolio] = useState({})
  const [portfolioHoldings, setPortfolioHoldings] = useState([])
  const [portfolioHoldingsData, setPortfolioHoldingsData] = useState([])
  const [errors, setErrors] = useState("")

  const [isFetching, setIsFetching] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [portfolioName, setPortfolioName] = useState("")

  const [signedIn, setSignedIn] = useState(false)
  const [userPortfolios, setUserPortfolios] = useState([])
  
  const handleInputChange = event => {
    setPortfolioName(event.currentTarget.value)
  }

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/v1/users`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      if (responseBody.signed_in) {
        setSignedIn(true)
        setUserPortfolios(responseBody.ids)
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  let portfolioId = props.match.params.id

  let buttonGroupClass = "no-button-group"
  if (signedIn === true && userPortfolios.includes(parseInt(portfolioId)) === true) {
    buttonGroupClass = "button-group"
  }

  let searchContainerClass = "search-container"
  if (signedIn === false) {
    searchContainerClass = "no-search-container"
  }

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
    fetchUser()
    fetchPortfolio()
  }, [])

  const updateSetter = () => {
    if (isUpdating === false) {
      setIsUpdating(true)
    } else {
      setIsUpdating(false)
    }
  }

  const updateStocks = () => {
    if (isDeleting === false) {
      setIsDeleting(true)
    } else {
      setIsDeleting(false)
    }
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
      if (isDeleting === false) {
        return (
          <CurrentHolding
            key={holding.id}
            holding={holding}
            data={portfolioHoldingsData[index]}
            portfolioId={portfolioId}
            isDeleting={false}
          />
        )
      } else {
        return (
          <CurrentHolding
            key={holding.id}
            holding={holding}
            data={portfolioHoldingsData[index]}
            portfolioId={portfolioId}
            setPortfolioHoldings={setPortfolioHoldings}
            setPortfolioHoldingsData={setPortfolioHoldingsData}
            isDeleting={true}
          />
        )
      }
    })
  }

  const [randomWords, setRandomWords] = useState(slug)

  const clickRandomWords = () => {
    return setPortfolioName(slug)
  }

  const getNewRandomWord = () => {
    slug = `${generateSlug(2, { format: "title" })}'s Portfolio`
    setRandomWords(slug)
  }

  let ctaMessage = <div></div>
  if (portfolioHoldingsData.length === 0) {
    ctaMessage = <div className="cta-message">Your portfolio is empty 🙁 <br/> You should add some stocks!</div>
  }

  if (isFetching === true) {
    return (
      <div className="loading-container">
        <img className="spinning-radial" src={spinner} />
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
            <input autoComplete="off" id="new-portfolio-input" className="input" type="text" name="name" placeholder={portfolio.name} onChange={handleInputChange} value={portfolioName} />
            <p className="new-name-form-subtext first">Need inspiration? How about <b className="random-words" onClick={clickRandomWords}>{slug}</b>?</p>
            <p className="new-name-form-subtext second">Want another suggestion? <img className="random-words" height="18px" width="18px" onClick={getNewRandomWord} src={reloadIcon} /></p>
            {/* <p className="new-name-form-subtext nevermind" onClick={updateSetter}>
              (Nevermind, take me back!)
            </p> */}
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
      if (isDeleting === true) {
        return (
          <div className="show-container">
            <div className="top-container">
              <div className="name-container">
                <h1 className="portfolio-name">{portfolio.name}</h1>
              </div>
              <div className={buttonGroupClass}>
                <div onClick={updateSetter} className="update-button button">
                  Update Portfolio Name
                </div>
                <div onClick={updateStocks} className="delete-button button">
                  Done Deleting?
                </div>
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
              searchContainerClass={searchContainerClass}
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
                    <th className="ticker-column-data-header">Delete?</th>
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
            <div className="top-container">
              <div className="name-container">
                <h1 className="portfolio-name">{portfolio.name}</h1>
              </div>
              <div className={buttonGroupClass}>
                <div onClick={updateSetter} className="update-button button">
                  Update Portfolio Name
                </div>
                <div onClick={updateStocks} className="delete-button button">
                  Delete Stocks
                </div>
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
              searchContainerClass={searchContainerClass}
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

}

export default PortfolioShow