import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import minusSign from "../../../assets/images/minus-sign.jpg"

const CurrentHolding = props => {

  const [shouldRedirect, setShouldRedirect] = useState({ status: false, id: null })

  const { isDeleting, portfolioId } = props

  let changeClass
  if (props.data) {
    if (props.data.d > 0) {
      changeClass = 'positive'
    } else if (props.data.d < 0) {
      changeClass = 'negative'
    } else if (props.data.d === 0) {
      changeClass = 'no-change'
    }
  }

  const linkToStockShow = () => {
    setShouldRedirect({status: true, id: props.holding.ticker})
  }

  const deleteStock = async () => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/portfolios/${portfolioId}/holdings/${props.holding.id}`, {
        credentials: "same-origin",
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(props.holding.ticker)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      props.setPortfolioHoldings(responseBody.holdings)
      props.setPortfolioHoldingsData(responseBody.stock_data)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  if (shouldRedirect.status) {
    return <Redirect push to={`/stocks/${shouldRedirect.id}`} />
  }

  if (isDeleting === false) {
    return (
      <tr onClick={linkToStockShow} className="holding-row">
          <td className="ticker-column">
            {props.holding.ticker}
          </td>
          <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.c.toFixed(2) : "-"}</td>
          <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.d.toFixed(2) : "-"}</td>
          <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.dp.toFixed(2) : "-"}</td>
          <td className={`ticker-column-data`}>{props.data ? props.data.o.toFixed(2) : "-"}</td>
          <td className={`ticker-column-data`}>{props.data ? props.data.h.toFixed(2) : "-"}</td>
          <td className={`ticker-column-data`}>{props.data ? props.data.l.toFixed(2) : "-"}</td>
      </tr>
    )
  } else {
    return (
      <tr className="holding-row">
        <td className="ticker-column">
          {props.holding.ticker}
        </td>
        <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.c.toFixed(2) : "-"}</td>
        <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.d.toFixed(2) : "-"}</td>
        <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.dp.toFixed(2) : "-"}</td>
        <td className="ticker-column-data">{props.data ? props.data.o.toFixed(2) : "-"}</td>
        <td className="ticker-column-data">{props.data ? props.data.h.toFixed(2) : "-"}</td>
        <td className="ticker-column-data">{props.data ? props.data.l.toFixed(2) : "-"}</td>
        <td className="ticker-column-data delete-symbol"> <img onClick={deleteStock} height="20" width="20" src={minusSign} /> </td>
      </tr>
    )
  }

}

export default CurrentHolding