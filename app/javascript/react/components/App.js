import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Index from './Index'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
