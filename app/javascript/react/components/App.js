import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Index from './Index'
import NewPortfolio from './NewPortfolio'
import PortfolioShow from './PortfolioShow'
import StockShow from './StockShow'
import UserShow from './UserShow'
import About from './About'
import TopInvestors from './TopInvestors'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/portfolios/new" component={NewPortfolio} />
        <Route exact path="/portfolios/:id" component={PortfolioShow} />
        <Route exact path="/stocks/:id" component={StockShow} />
        <Route exact path="/users/:id" component={UserShow} />
        <Route exact path="/about" component={About} />
        <Route exact path="/top-investors" component={TopInvestors} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
