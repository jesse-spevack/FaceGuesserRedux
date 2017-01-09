import React          from 'react';
import CohortSelect   from './CohortSelect'
import Game           from './Game'
import axios          from 'axios'
import _              from 'lodash'

class App extends React.Component {
  constructor() {
    super()
    this.state = { cohort: '', correct: 0, incorrect: 0 }
  }

  startGame(cohort) {
    axios.get('http://localhost:3001/api/v1/users')
    .then((response) => {
      return _.filter(response.data, (person) => {
        return person.cohort === cohort;
      })
    })
    .then((peopleFromCohort) => {
      this.setState( { people: peopleFromCohort, cohort: cohort })
    });
  }

  incrementCorrect() {
    this.setState({ correct: this.state.correct += 1 })
  }

  incrementIncorrect() {
    let incorrect = this.state.incorrect += 1
    this.setState({ incorrect: incorrect })
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
        <div>
          <h4>Correct: {this.state.correct} Incorrect: {this.state.incorrect}</h4>
          <Game people={this.state.people}
                correct={() => this.incrementCorrect()}
                incorrect={() => this.incrementIncorrect()}/>
        </div>
      )
    }
  }
}

export default App;
