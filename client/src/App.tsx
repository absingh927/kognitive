import React from 'react'
import './App.css'

import {Container} from "reactstrap"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from "./login/LoginView"
import Tasks from "./tasks/TasksView"

function App() {  
  return (
    <Container fluid={true}>
      <Router>
        <Switch>
          <Redirect exact path='/' to="/login"/>
          <Route exact path='/login' component={Login}/>
          <Route path='/tasks' component={Tasks}/>
          <Route exact render={() => <h1>Opps, Page not found!</h1>} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
