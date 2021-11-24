import React from "react"

const CurrentHolding = props => {

  return (
    <tr>
      <td className="ticker-column">{props.holding.ticker}</td>
      <td className="ticker-column">{props.data.c}</td>
      <td className="ticker-column">{props.data.d}</td>
      <td className="ticker-column">{props.data.dp}</td>
    </tr>
  )
}

export default CurrentHolding