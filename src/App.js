import React, { Component } from 'react'
import { database } from './firebase'
import { isMounted } from './utils'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import QuizList from './QuizList'
import ModalCreateQuiz from './ModalCreateQuiz'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.database = database.ref('/topics')
    this.state = {
      quizes: null,
      open: false,
      loading: true
    }
  }

  componentWillMount() {
    this.database.on('value', snapshot => {
      if (isMounted(this)) {
        this.setState({ quizes: snapshot.val(), loading: false })
      }
    })
  }

  handleModal = () => {
    this.setState({ open: !this.state.open })
  }

  removeQuiz = quizID => {
    this.database.child(quizID).remove()
  }

  render() {
    const { quizes, open, loading } = this.state
    return (
      <div>
        <AppBar
          title="Quiz App"
          showMenuIconButton={false}
          iconElementRight={<FlatButton label="Create Quiz" onClick={this.handleModal} />}
        />
        <div className="Topic">
          {quizes && <QuizList quizes={this.state.quizes} removeQuiz={this.removeQuiz} />}
          {loading && <CircularProgress className="Loading" size={80} thickness={5} />}
          {!quizes && !loading && <p>No quizes. Add one</p>}
        </div>
        <ModalCreateQuiz open={open} handleModal={this.handleModal} database={this.database} />
      </div>
    )
  }
}

export default App
