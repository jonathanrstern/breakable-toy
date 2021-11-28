import React from "react"

const SearchResult = props => {

  const { stock } = props
  const ticker = stock.ticker
  let name = stock.name

  let addToHoldings = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/portfolios/${props.portfolioId}/holdings`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(props.stock.ticker)
      })
      const responseBody = await response.json()
      if (responseBody.error) {
        props.setErrors(responseBody.error)
      } else {
        props.setPortfolioHoldings([...props.portfolioHoldings, responseBody.stock])
        props.setPortfolioHoldingsData([...props.portfolioHoldingsData, responseBody.stock_data])
        props.setErrors("")
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
    props.setStocks([])
    props.setSearchString("")
  }

  return (
    <div className="search-result" onClick={addToHoldings}>
      <div className="ticker">{ticker}</div>
      <div className="name">{name}</div>
    </div>
  )
}

export default SearchResult