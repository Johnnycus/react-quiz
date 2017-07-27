import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import QuizQuestion from './QuizQuestion'
import './index.css';

const FourOhFour = () => <h1>404</h1>

const ClientApp = () => (
  <MuiThemeProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/:quiz/:question" component={QuizQuestion} />
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  </MuiThemeProvider>
)

export default ClientApp
