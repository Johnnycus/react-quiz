import React, { Component } from 'react';
import { database } from './firebase';
import QuizList from './QuizList';
import Modal from './Modal';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.database = database.ref('/topics');
    this.state = {
      quizes: null,
      open: false
    };
  }

  componentDidMount() {
    this.database
      .on('value', (snapshot) => {
        this.setState({ quizes: snapshot.val() });
      })
  }

  handleModal = () => {
    this.setState({ open: !this.state.open });
  }

  removeQuiz = (quizID) => {
    this.database.child(quizID).remove();
  }

  render() {
    return (
      <div>
        <AppBar
          title="Quiz App"
          showMenuIconButton={false}
          iconElementRight={
            <FlatButton
              label='Create Quiz'
              onClick={this.handleModal} />
          }
        />
        <div className="Topic">
          {this.state.quizes ? (
            <QuizList
              quizes={this.state.quizes}
              removeQuiz={this.removeQuiz} />
          ) : (
            <CircularProgress className="Loading" size={80} thickness={5} />
          )}
        </div>
        <Modal
          open={this.state.open}
          handleModal={this.handleModal}
          database={this.database} />
      </div>
    );
  }
}

export default App;
