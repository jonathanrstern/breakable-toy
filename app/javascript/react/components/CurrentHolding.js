import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"

const CurrentHolding = props => {

  const [shouldRedirect, setShouldRedirect] = useState({ status: false, id: null })

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

  if (shouldRedirect.status) {
    return <Redirect push to={`/stocks/${shouldRedirect.id}`} />
  }

  return (
    <tr onClick={linkToStockShow} className="holding-row">
        <td className="ticker-column">
        {props.holding.ticker}
        </td>
        <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.c : "-"}</td>
        <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.d.toFixed(2) : "-"}</td>
        <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.dp.toFixed(2) : "-"}</td>
        <td className={`ticker-column-data`}>{props.data ? props.data.o.toFixed(2) : "-"}</td>
        <td className={`ticker-column-data`}>{props.data ? props.data.h.toFixed(2) : "-"}</td>
        <td className={`ticker-column-data`}>{props.data ? props.data.l.toFixed(2) : "-"}</td>
    </tr>
  )
}

export default CurrentHolding