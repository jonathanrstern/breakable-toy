import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Index from './Index'
import NewPortfolio from './NewPortfolio'
import PortfolioShow from './PortfolioShow'
import StockShow from './StockShow'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/portfolios/new" component={NewPortfolio} />
        <Route exact path="/portfolios/:id" component={PortfolioShow} />
        <Route exact path="/stocks/:id" component={StockShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
