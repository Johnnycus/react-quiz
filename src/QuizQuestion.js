import React, { Component } from 'react';
import { isMounted } from './utils';
import { Link } from 'react-router-dom';
import { database } from './firebase';

class QuizQuestion extends Component {
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
        const quizName = Object.keys(snapshot.val())[0];
        const quiz = snapshot.val()[quizName];
        const question = snapshot.val()[quizName].questions[this.props.match.params.question];
        if (isMounted(this)) { this.setState({ quizName, quiz, question }) }
      })
  }

  checkAnswer = () => {
    database
      .ref(`/topics/${this.state.quizName}/questions/${this.props.match.params.question}`).update({
        done: true
      })
  }

  render() {
    const { name, done, question, answer } = this.state.question;
    return (
      <div>
        <Link to="/">Go back</Link>
        <h1>{this.state.quiz.name}</h1>
        <h2>{name} points</h2>
        <h3>Question: {question}</h3>
        <p className={`Answer ${done ? '' : 'hide'}`}>{answer}</p>
        <button className={`Answer ${done ? 'hide' : ''}`} onClick={this.checkAnswer}>Check</button>
      </div>
    )
  }
}

export default QuizQuestion
