import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UserPortfolioTile from "./UserPortfolioTile"

const UserShow = props => {

  const [portfolios, setPortfolios] = useState([])
  const [portfolioCounts, setPortfolioCounts] = useState([])
  let userId = props.match.params.id

  const fetchPortfolios = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setPortfolios(responseBody.portfolios)
      setPortfolioCounts(responseBody.counts)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const portfolioNames = portfolios.map((portfolio, index) => {
    return (
      <UserPortfolioTile
        key={portfolio.id}
        portfolio={portfolio}
        portfolioCount={portfolioCounts[index]}
      />
    )
  })

  return (
    <div className="user-show-container">
      <div className="user-show-header-container">
        <h1 className="user-show-header">My Portfolios</h1>
        <Link to="/portfolios/new" className="button">Create a portfolio</Link>
      </div>
      <div className="user-show-list">{portfolioNames}</div>
    </div>
  )
}

export default UserShow