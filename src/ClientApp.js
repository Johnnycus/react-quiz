import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'
import QuizQuestion from './QuizQuestion'
import ModalQuizQuestion from './ModalQuizQuestion'
import './index.css'

export const FourOhFour = () => <h1>404</h1>

class ModalSwitch extends Component {
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(location.state && location.state.modal && this.previousLocation !== location) // not initial render

    return (
      <MuiThemeProvider>
        <div>
          <Switch location={isModal ? this.previousLocation : location}>
            <Route exact path="/" component={App} />
            <Route exact path="/:quiz/:question" component={QuizQuestion} />
            <Route component={FourOhFour} />
          </Switch>
          {isModal ? <Route path="/:quiz/:question" component={ModalQuizQuestion} /> : null}
        </div>
      </MuiThemeProvider>
    )
  }
}

const ClientApp = () =>
  <Router>
    <Route component={ModalSwitch} />
  </Router>

export default ClientApp
