import React from "react"
import { Link } from "react-router-dom" 

const UserPortfolioTile = props => {

  const { portfolio, portfolioCount } = props

  return (
    <div className="user-portfolio-container">
      <Link className="user-portfolio-name" to={`/portfolios/${portfolio.id}`}>
        {`${portfolio.name} (${portfolioCount} stocks)`}
      </Link>
    </div>
  )
}

export default UserPortfolioTile