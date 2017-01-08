import React from 'react';
var _ = require('lodash');

class Game extends React.Component {
  getRandomPerson() {
    // console.log(this.props.people)
    return _.sample(this.props.people)
  }

  render() {
    return (
      <div>
        <img src={this.getRandomPerson().image_url} />
        <a href="#" className="btn btn-default">{this.getRandomPerson().first_name}</a>
        <a href="#" className="btn btn-default">{this.getRandomPerson().first_name}</a>
        <a href="#" className="btn btn-default">{this.getRandomPerson().first_name}</a>
        <a href="#" className="btn btn-default">{this.getRandomPerson().first_name}</a>
      </div>
    )
  }
}

export default Game
