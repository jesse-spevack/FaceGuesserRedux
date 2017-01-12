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
    axios({
      method: 'post',
      url: 'http://localhost:3001/oauth/token',
      params: {
        'grant_type': 'client_credentials',
      },
      auth: {
        username: 'da44cc24c364f64ba14804a55793b2ae7bd1d39604e615d72ea6a36bf50f1959',
        password: 'f0676d6cb0e4afe8c4f66fd791cfbcfa256d35949d61c6883d0ea516f356f3aa'
      },
      crossDomain: true,
      header: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then((response) => {
      return axios({
        method: 'get',
        url: 'http://localhost:3001/api/v1/users',
        headers: {
          "Authorization": response.data.access_token
        }
      })
    })
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

  endGame() {
    this.setState({ cohort: ''})
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
          <div className="container">
            <table className="table">
              <tr><th>Correct</th><th>Incorrect</th></tr>
              <tr><td>{this.state.correct}</td><td>{this.state.incorrect}</td></tr>
            </table>
          </div>
          <Game people={this.state.people}
                correct={() => this.incrementCorrect()}
                incorrect={() => this.incrementIncorrect()}
                gameOver={() => this.endGame()}/>
        </div>
      )
    }
  }
}

export default App;
