import React, { Component } from 'react'
import { isMounted } from './utils'
import { database } from './firebase'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class ModalQuizQuestion extends Component {
  state = {
    quizName: '',
    quiz: {},
    question: {}
  }

  componentDidMount() {
    database
      .ref('/topics')
      .orderByChild('name')
      .equalTo(this.props.match.params.quiz.split('-').join(' '))
      .on('value', snapshot => {
        const quizName = Object.keys(snapshot.val())[0]
        const quiz = snapshot.val()[quizName]
        const question = snapshot.val()[quizName].questions[this.props.match.params.question]
        if (isMounted(this)) {
          this.setState({ quizName, quiz, question })
        }
      })
  }

  checkAnswer = () => {
    database.ref(`/topics/${this.state.quizName}/questions/${this.props.match.params.question}`).update({
      done: true
    })
  }

  render() {
    const { name, done, question, answer } = this.state.question
    const { history } = this.props
    const back = e => {
      history.goBack()
    }
    const actions = [<FlatButton label="Close" primary={true} onTouchTap={back} />]

    return (
      <Dialog
        title={this.state.quiz.name}
        actions={actions}
        open={true}
        onRequestClose={back}
        autoScrollBodyContent={true}
      >
        <h2>
          {name} points
        </h2>
        <h3>
          Question: {question}
        </h3>
        <p className={`Answer ${done ? '' : 'hide'}`}>
          {answer}
        </p>
        <button className={`Answer ${done ? 'hide' : ''}`} onClick={this.checkAnswer}>
          Check
        </button>
      </Dialog>
    )
  }
}

export default ModalQuizQuestion