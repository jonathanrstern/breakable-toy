import React, { useEffect, useState } from 'react'
// import Chart from 'kaktana-react-lightweight-charts'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
 
const StockChart = (props) => (

    <TradingViewWidget
      symbol={props.ticker}
      theme={Themes.LIGHT}
      locale="en"
      width="600px"
      height="350px"
      interval="60"
      style="3"
    />
)

// const StockChart = (props) => {

//   const { prices, times } = props

//   let timeSeries = []
//   let timePriceObject

//   if (prices) {
//     for (let i = 0; i < prices.length; i++) {
//         timePriceObject = { time: times[i], value: prices[i] }
//         timeSeries.push(timePriceObject)
//     }
//   }


  // const chart = createChart(chartElementRef.current, {
  //   width: 600,
  //   height: 300,
  //   priceScale: {
  //     scaleMargins: {
  //       top: 0.3,
  //       bottom: 0.25
  //     },
  //     borderVisible: false
  //   },
  //   layout: {
  //     fontFamily: 'Inter',
  //     backgroundColor: "#131722",
  //     textColor: "#d1d4dc"
  //   },
  //   grid: {
  //     vertLines: {
  //       color: "rgba(42, 46, 57, 0)"
  //     },
  //     horzLines: {
  //       color: "rgba(42, 46, 57, 0.6)"
  //     }
  //   }
  // })

  // const areaSeries = {
  //   topColor: "rgba(38,198,218, 0.56)",
  //   bottomColor: "rgba(38,198,218, 0.04)",
  //   lineColor: "rgba(38,198,218, 1)",
  //   lineWidth: 2
  // }

export default StockChart