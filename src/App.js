import React, { Component } from 'react';
import './App.css';
import CohortSelect from './CohortSelect'

class App extends Component {
  constructor() {
    super()
    this.state = { cohort: '' }
  }

  startGame(cohort) {
    console.log("Starting game! " + cohort)
    this.setState({cohort: cohort})
  }

  render() {
    if (this.state.cohort === '') {
      return (
        <div className="App">
          <CohortSelect startGame={this.startGame.bind(this)}/>
        </div>
      )
    } else {
      return (<h1>We did it!</h1>)
    }
  }
}

export default App;
