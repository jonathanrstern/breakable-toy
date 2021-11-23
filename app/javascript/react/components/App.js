import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Index from './Index'
import NewPortfolio from './NewPortfolio'
import PortfolioShow from './PortfolioShow'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/portfolios/new" component={NewPortfolio} />
        <Route exact path="/portfolios/:id" component={PortfolioShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
