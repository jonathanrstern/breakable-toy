import React, { useEffect, useState, useRef } from "react"
import StockShowMetrics from "./StockShowMetrics"
import StockShowNews from "./StockShowNews"
import StockChart from "./StockChart" 

const StockShow = props => {

  const ref = useRef()

  const [stock, setStock] = useState({})
  const [isFetching, setIsFetching] = useState(true)

  let ticker = props.match.params.id.toUpperCase()

  const fetchStock = async () => {
    setIsFetching(true)
    try {
      const response = await fetch(`/api/v1/stocks/${ticker}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setStock(responseBody)
      setIsFetching(false)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchStock()
  }, [])

  let changeClass
  let sign
  if (stock.price) {
    if (stock.change_dollar > 0) {
      sign = '+'
      changeClass = 'positive'
    } else if (stock.change_dollar < 0) {
      sign = ''
      changeClass = 'negative'
    } else if (stock.change_dollar === 0) {
      sign = '+'
      changeClass = 'no-change'
    }
  }

  if (isFetching === true) {
    return (
      <div className="loading-container">
        <img className="spinning-radial" src="https://miro.medium.com/max/1400/0*ptDX0HfJCYpo9Pcs.gif" />
        <p className="loading-verbiage">Pinging Wall Street... just a second!</p>
      </div>
    )
  } else {
    return (
      <div className="stock-show">
        <div className="metrics-chart-container">
          <div className="metrics">
            <div className="stock-header">
              <div className="name-exchange">
                <h1 className="stock-name">{stock.name} ({ticker})</h1>
                <h5 className="stock-exchange">{stock.exchange}</h5>
              </div>
            </div>
            <div className="current-price">
              <h2 className={`price`}>{stock.price ? stock.price.toFixed(2) : ""}</h2>
              <h3 className={`price-change ${changeClass}`}>{stock.change_dollar ? `${sign}${stock.change_dollar.toFixed(2)}` : ""} ({stock.change_percent ? `${sign}${stock.change_percent.toFixed(2)}%` : ""})</h3>
            </div>
            <div className="daily-prices">
              <h5 className="daily">Open:</h5>
              <span className="daily-metric">{stock.open.toFixed(2)}</span>
              <h5 className="daily">High:</h5>
              <span className="daily-metric">{stock.high.toFixed(2)}</span>
              <h5 className="daily">Low:</h5>
              <span className="daily-metric">{stock.low.toFixed(2)}</span>
            </div>
            <div>
              <StockShowMetrics
                stock={stock}
              />
            </div>
          </div>
          <div className="chart">
            <StockChart
              ticker={ticker}
            />
          </div>
        </div>

        <StockShowNews
          articles={stock.articles}
        />
      </div>
    )
  }
}

export default StockShow