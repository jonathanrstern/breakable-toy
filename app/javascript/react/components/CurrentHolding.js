import React from "react"

const CurrentHolding = props => {

  return (
    <tr>
      <td>{props.holding.ticker}</td>
      <td>{props.holding.name}</td>
    </tr>
  )
}

export default CurrentHolding