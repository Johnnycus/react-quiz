import React from 'react';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import map from 'lodash/map';

const QuizItem = ({ quiz, quizID, removeQuiz }) => {
  const onRemoveQuiz = () => {
    removeQuiz(quizID)
  }

  return (
    <Card key={quiz.timestamp} className="Container">
      <div className="Cell">
        <CardHeader
          className="CardHeader"
          title={quiz.name}
          subtitle={`${quiz.progress}/5`}
        />
      </div>
      <div className="Cell">
        <CardActions className="CardActions">
          {
            map(quiz.questions, (question) => {
              return <RaisedButton
                className="Button"
                label={`${question.name}${question.done ? ' ✔' : ''}`}
                disabled={question.done && true}
                secondary={true}
                key={question.name} />
            })
          }
          <RaisedButton
            className="Button"
            onClick={onRemoveQuiz}
            label="❌"
            secondary={true} />
        </CardActions>
      </div>
    </Card>
  )
}

export default QuizItem
