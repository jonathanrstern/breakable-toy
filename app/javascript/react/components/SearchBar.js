import React, { useState } from 'react'
import SearchResult from './SearchResult'

const SearchBar = (props) => {
  const [stocks, setStocks] = useState([])
  const [searchString, setSearchString] = useState('')

  let searchContainerClass = ""
  if (stocks.length != 0) {
    searchContainerClass = "search-results-container"
  }

  const handleChange = async (event) => {
    const newSearchString = event.target.value
    setSearchString(newSearchString)
    
    const body = JSON.stringify({
      search_string: newSearchString
    })
    try {
      const response = await fetch("/api/v1/stocks/search.json", {
        method: "POST",
        credentials: 'same-origin',
        body: body,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setStocks(responseBody)
      if (newSearchString === '') {
        setStocks([])
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const suggestionsList = stocks.map(stock => {
    return (
      <SearchResult
        key={stock.id}
        portfolioHoldings={props.portfolioHoldings}
        setPortfolioHoldings={props.setPortfolioHoldings}
        portfolioHoldingsData={props.portfolioHoldingsData}
        setPortfolioHoldingsData={props.setPortfolioHoldingsData}
        setErrors={props.setErrors}
        portfolioId={props.portfolioId}
        stock={stock}
        setStocks={setStocks}
        setSearchString={setSearchString}
      />
    )
  })

  return (
    <div className="search-container">
      <form>
        <label className="form-label">Add a stock:</label>
        <input autoComplete="off" className="input search-field" placeholder="Search for a company (e.g., AAPL, TSLA, GOOG)" type='text' name='searchString' value={searchString} onChange={handleChange} />
      </form>
      <div className={searchContainerClass}>
        {suggestionsList}
      </div>
    </div>
  )
}

export default SearchBar