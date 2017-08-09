import React, { Component } from 'react'
import { isMounted } from './utils'
import { Link } from 'react-router-dom'
import { database } from './firebase'

class QuizQuestion extends Component {
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
    database.ref(`/topics/${quizName}/questions/${question}`).update({
      done: true
    })
    database.ref(`/topics/${quizName}`).update({
      progress: quiz.progress + 1
    })
  }

  render() {
    const { name, done, question, answer } = this.state.question

    return (
      <div>
        {name &&
          <div>
            <Link to="/">Go back</Link>
            <h1>
              {this.state.quiz.name}
            </h1>
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
          </div>}
      </div>
    )
  }
}

export default QuizQuestion
