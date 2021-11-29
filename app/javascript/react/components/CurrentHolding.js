import React from "react"

const CurrentHolding = props => {

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

  return (
    <tr className="holding-row">
      <td className="ticker-column">{props.holding.ticker}</td>
      <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.c : ""}</td>
      <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.d.toFixed(2) : ""}</td>
      <td className={`ticker-column-data ${changeClass}`}>{props.data ? props.data.dp.toFixed(2) : ""}</td>
      <td className={`ticker-column-data`}>{props.data ? props.data.o.toFixed(2) : ""}</td>
      <td className={`ticker-column-data`}>{props.data ? props.data.h.toFixed(2) : ""}</td>
      <td className={`ticker-column-data`}>{props.data ? props.data.l.toFixed(2) : ""}</td>
    </tr>
  )
}

export default CurrentHolding