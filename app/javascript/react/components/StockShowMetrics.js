import React, { useEffect, useState } from "react"

const StockShowMetrics = props => {

  const { stock } = props

  const convertToBillions = (number) => {
    if (number) {
      return Math.abs(Number(number)) >= 1.0e+12
      ? (Math.abs(Number(number)) / 1.0e+12).toFixed(2) + "T"
      : Math.abs(Number(number)) >= 1.0e+9
      ? (Math.abs(Number(number)) / 1.0e+9).toFixed(2) + "B"
      : Math.abs(Number(number)) >= 1.0e+6
      ? (Math.abs(Number(number)) / 1.0e+6).toFixed(2) + "M"
      : Math.abs(Number(number)) >= 1.0e+3
      ? (Math.abs(Number(number)) / 1.0e+3).toFixed(2) + "K"
      : Math.abs(Number(number));
    }
  }

  return (
    <table className="stock-show-table">
      <tbody>
        <tr className="metric-row">
          <td className="metric">Market Cap</td>
          <td className="data">{stock.market_cap ? convertToBillions(stock.market_cap * 1000000) : "-"}</td>
        </tr>
        <tr className="metric-row">
          <td className="metric">Shares Outstanding</td>
          <td className="data">{stock.shares ? convertToBillions(stock.shares * 1000000) : "-"}</td>
        </tr>
        <tr className="metric-row">
          <td className="metric">Revenue</td>
          <td className="data">{stock.revenue ? convertToBillions(stock.revenue * 1000000) : "-"}</td>
        </tr>
        <tr className="metric-row">
          <td className="metric">Earnings Per Share</td>
          <td className="data">{stock.eps ? stock.eps.toFixed(2) : "-"}</td>
        </tr>
        <tr className="metric-row">
          <td className="metric">P/E Ratio</td>
          <td className="data">{stock.pe_ratio ? stock.pe_ratio.toFixed(2) : "-"}</td>
        </tr>
        <tr className="metric-row">
          <td className="metric">Dividend Yield</td>
          <td className="data">{stock.div_yield ? `${stock.div_yield.toFixed(2)}%` : "-"}</td>
        </tr>
        <tr className="metric-row">
          <td className="metric">Beta</td>
          <td className="data">{stock.beta ? stock.beta.toFixed(2) : "-"}</td>
        </tr>
        <tr className="metric-row">
          <td className="metric">Profit Margin</td>
          <td className="data">{stock.profit_margin ? `${stock.profit_margin.toFixed(2)}%` : "-"}</td>
        </tr>
        <tr className="metric-row">
          <td className="metric">52 Week Range</td>
          <td className="data">{stock.annual_low ? `${stock.annual_low.toFixed(2)}` : ""} - {stock.annual_high ? `${stock.annual_high.toFixed(2)}` : ""}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StockShowMetrics