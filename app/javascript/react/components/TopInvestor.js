import React from "react"
import { Link } from "react-router-dom"

const TopInvestor = props => {

  const { name, photo_url, fund, id } = props

  return (
    <Link to={`/portfolios/${id}`} className="top-investor-container">
      <div className="top-investor-image-container">
        <img className="top-investor-image" src={photo_url}/>
      </div>
      <div className="top-investor-name-container">
        <div className="top-investor-name">{name}</div>
        <div className="top-investor-fund">{fund}</div>
      </div>
    </Link>
  )
}

export default TopInvestor