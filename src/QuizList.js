import React from 'react';
import map from 'lodash/map';
import QuizItem from './QuizItem'
import './Quiz.css';

const Quiz = ({ quizes, removeQuiz }) => (
  <div>
    {
      map(quizes, (quiz, key) => <QuizItem key={key} quizID={key} quiz={quiz} removeQuiz={removeQuiz} />)
    }
  </div>
)

export default Quiz;
