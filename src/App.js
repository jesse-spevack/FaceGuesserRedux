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
    console.log(cohort)
    axios({
      method: 'post',
      url: 'https://turing-census.herokuapp.com/oauth/token',
      params: {
        'grant_type': 'client_credentials',
      },
      auth: {
        username: process.env.username,
        password: process.env.password
      },
      crossDomain: true,
      header: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then((response) => {
      console.log(response)
      return axios({
        method: 'get',
        // local
        // url: 'http://localhost:3001/api/v1/users',
        // staging
        url: 'https://turing-census.herokuapp.com/api/v1/users',
        headers: {
          "Authorization": "Bearer " + response.data.access_token
        }
      })
    })
    .then((response) => {
      console.log("People from census: ")
      console.log(response.data)
      return _.filter(response.data, (person) => {
        return person.cohort === cohort;
      })
    })
    .then((peopleFromCohort) => {
      console.log("People from cohort: ")
      console.log(peopleFromCohort)
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
