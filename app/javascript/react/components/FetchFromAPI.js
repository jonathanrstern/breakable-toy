import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"

const FetchFromAPI = () => {

  const [stockData, setStockData] = useState({})

  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1/stocks")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setStockData(responseBody)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
    </div>
  )
}

export default FetchFromAPI