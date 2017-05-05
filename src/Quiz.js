import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import map from 'lodash/map';
import './Quiz.css';

class Quiz extends Component {
  static propTypes = {
    quizes: PropTypes.object.isRequired,
    removeQuiz: PropTypes.func.isRequired,
  };

  render() {
    const { quizes, removeQuiz } = this.props;
    return (
      <div>
        {
          map(quizes, (quiz, key) => {
            return (
              <Card key={key} className="Container">
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
                      map(quiz.questions, (question, key) => {
                        return <RaisedButton
                                  className="Button"
                                  label={`${question.name}${question.done ? ' ✔' : ''}`}
                                  disabled={question.done && true}
                                  secondary={true}
                                  key={key} />
                      })
                    }
                    <RaisedButton
                      className="Button"
                      onClick={() => removeQuiz(key)}
                      label="❌"
                      secondary={true} />
                  </CardActions>
                </div>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

export default Quiz;
