import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

const initialState = {
  topic: '',
  '100-question': '',
  '200-question': '',
  '300-question': '',
  '400-question': '',
  '500-question': '',
  '100-answer': '',
  '200-answer': '',
  '300-answer': '',
  '400-answer': '',
  '500-answer': ''
}

class ModalCreateQuiz extends Component {
  state = initialState

  static propTypes = {
    open: PropTypes.bool.isRequired,
    database: PropTypes.object.isRequired,
    handleModal: PropTypes.func.isRequired
  }

  hanldeInputChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  clearModal = () => {
    this.setState(initialState)
  }

  checkState = () => {
    // return Object.keys(this.state).length < 11;
    // for (const key in this.state) {
    //   if (this.state[key] === '') {
    //     return true
    //   };
    // }
    // for (let [key, value] of Object.entries(this.state)) {
    //   if (value == '') { console.log('true')};
    // }
    // Object.keys(this.state).every(x => !this.state[x])
    if (
      !this.state.topic ||
      !this.state['100-answer'] ||
      !this.state['200-answer'] ||
      !this.state['300-answer'] ||
      !this.state['400-answer'] ||
      !this.state['500-answer'] ||
      !this.state['100-question'] ||
      !this.state['200-question'] ||
      !this.state['300-question'] ||
      !this.state['400-question'] ||
      !this.state['500-question']
    ) {
      return true
    }
  }

  createQuiz = () => {
    if (this.checkState()) return false

    this.props.database.push({
      name: this.state.topic,
      url: this.state.topic.replace(/[^a-zA-Z0-9\s]/g, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, '-'),
      progress: 0,
      timestamp: Date.now(),
      questions: {
        100: {
          name: '100',
          question: this.state['100-question'],
          answer: this.state['100-answer'],
          done: false
        },
        200: {
          name: '200',
          question: this.state['200-question'],
          answer: this.state['200-answer'],
          done: false
        },
        300: {
          name: '300',
          question: this.state['300-question'],
          answer: this.state['300-answer'],
          done: false
        },
        400: {
          name: '400',
          question: this.state['400-question'],
          answer: this.state['400-answer'],
          done: false
        },
        500: {
          name: '500',
          question: this.state['500-question'],
          answer: this.state['500-answer'],
          done: false
        }
      }
    })

    this.clearModal()
    this.props.handleModal()
  }

  render() {
    const { open, handleModal } = this.props

    const style = {
      question: {
        marginRight: '2%',
        width: '48%'
      },
      answer: {
        marginLeft: '2%',
        width: '48%'
      }
    }

    const actions = [
      <FlatButton label="Clear" primary={true} onTouchTap={this.clearModal} />,
      <FlatButton label="Cancel" primary={true} onTouchTap={handleModal} />,
      <FlatButton label="Submit" primary={true} onTouchTap={this.createQuiz} disabled={this.checkState()} />
    ]

    let i,
      inputs = []
    for (i = 1; i < 6; i++) {
      inputs.push(
        <div key={i}>
          <TextField
            name={`${i}00-question`}
            value={this.state[`${i}00-question`]}
            onChange={this.hanldeInputChange}
            floatingLabelText={`${i}00`}
            style={style.question}
            multiLine={true}
          />
          <TextField
            name={`${i}00-answer`}
            value={this.state[`${i}00-answer`]}
            onChange={this.hanldeInputChange}
            floatingLabelText="Answer"
            style={style.answer}
            multiLine={true}
          />
        </div>
      )
    }

    return (
      <Dialog
        title="Create Quiz"
        actions={actions}
        open={open}
        onRequestClose={handleModal}
        autoScrollBodyContent={true}
      >
        <TextField
          name="topic"
          value={this.state.topic}
          floatingLabelText="Topic Name"
          onChange={this.hanldeInputChange}
          fullWidth={true}
          multiLine={true}
        />
        <br />
        <br />
        Questions:
        {inputs}
      </Dialog>
    )
  }
}

export default ModalCreateQuiz
