import React, { Component } from 'react';
import CohortSelect from './CohortSelect'
import Game from './Game'
import $ from 'jquery'

class App extends Component {
  constructor() {
    super()
    this.state = { cohort: '' }
  }

  startGame(cohort) {
    $.getJSON('http://localhost:3001/api/v1/users', (people) => {
      this.setState( { people: people } )
    }).then(() => {
      this.setState( { cohort: cohort } )
    })
  }

  render() {
    if (this.state.cohort === '') {
      return (
        <div className="App">
          <CohortSelect startGame={this.startGame.bind(this)}/>
        </div>
      )
    } else {
      return (
        <Game people={ this.state.people }/>
      )
    }
  }
}

export default App;
