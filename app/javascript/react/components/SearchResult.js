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
        props.setPortfolioHoldings([...props.portfolioHoldings, responseBody])
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  return (
    <li onClick={addToHoldings}>{ticker}, {name}</li>
  )
}

export default SearchResult