import React, { useState } from 'react'

const SearchBar = (props) => {
  const [stocks, setStocks] = useState([])
  const [searchString, setSearchString] = useState('')

  const handleChange = (event) => {
    const newSearchString = event.target.value
    setSearchString(newSearchString)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = JSON.stringify({
      search_string: searchString
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
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const list = stocks.map(stock => {
    return (
      <li>{stock.ticker}, {stock.name}</li>
    )
  })

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <label>Add a stock</label>
        <input className="input search-field" type='text' name='searchString' value={searchString} onChange={handleChange} />

        <input className="button" type='submit' value='Add' />
      </form>
      <ul>{list}</ul>
    </div>
  )
}

export default SearchBar