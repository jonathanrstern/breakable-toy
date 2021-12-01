import React from "react"
import { Link } from "react-router-dom"

const TopInvestor = props => {

  const { name, photo_url, fund_logo_url } = props

  return (
    <div className="top-investor-container">
      <div className="top-investor-header">
        <div className="top-investor-image-container">
          <img className="top-investor-image" src={photo_url} width="50px" height="50px" />
        </div>
        <div className="top-investor-name">
          {name}
        </div>
      </div>
      <div className="top-investor-fund">
        <img className="top-investor-fund-image" src={fund_logo_url} />
      </div>
    </div>
  )
}

export default TopInvestor