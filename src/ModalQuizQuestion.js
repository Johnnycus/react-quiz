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
    database.ref('/topics').orderByChild('url').equalTo(this.props.match.params.quiz).on('value', snapshot => {
      const quizName = Object.keys(snapshot.val())[0]
      const quiz = snapshot.val()[quizName]
      const question = snapshot.val()[quizName].questions[this.props.match.params.question]
      if (isMounted(this)) {
        this.setState({ quizName, quiz, question })
      }
    })
  }

  checkAnswer = () => {
    const { quizName, quiz } = this.state,
      { question } = this.props.match.params
    console.log(quizName.progress)
    database.ref(`/topics/${quizName}/questions/${question}`).update({
      done: true
    })
    database.ref(`/topics/${quizName}`).update({
      progress: quiz.progress + 1
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
          Answer: {answer}
        </p>
        <button className={`Answer ${done ? 'hide' : ''}`} onClick={this.checkAnswer}>
          Check
        </button>
      </Dialog>
    )
  }
}

export default ModalQuizQuestion
