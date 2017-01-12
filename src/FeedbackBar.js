import React          from 'react';

class FeedbackBar extends React.Component {

  giveFeedback () {
    if (this.props.correct) {
      return (
        <div className="alert alert-success">Correct!</div>
      )
    } else {
      return (
        <div className="alert alert-danger">
          Incorrect: You guessed {this.props.guess} but the correct answer is {this.props.person}.
        </div>
      )
    }
  }

  render() {
    if (this.props.show === true) {
      return (
        this.giveFeedback()
      )
    } else {
      return null;
    }

  }

}
export default FeedbackBar
