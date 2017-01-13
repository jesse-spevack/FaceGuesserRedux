import React          from 'react';
import _              from 'lodash'
import FeedbackBar    from './FeedbackBar'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = { person: this.getRandomPerson(),
                   showFeedback: false,
                   knownPeople: [] };
  }

  componentWillMount() {
    let randomFour = this.getRandomFour(this.state.person);
    this.setState( { choices: randomFour })
  }

  getRandomPerson() {
    let knownPeople = this.state && this.state.knownPeople || []
    console.log("Known people: " + knownPeople.map((person) => {return person.first_name}).join(", "))
    let remainingPeople = _.difference(this.props.people, knownPeople)
    console.log("Remaining people: " + remainingPeople.map((person) => {return person.first_name}).join(", "))
    return _.sample(remainingPeople)
  }

  getRandomFour(person) {
    let randomFour = [person];
    while (randomFour.length < 4 ) {
      let person = _.sample(this.props.people)
      if (randomFour.indexOf(person) === -1) {
        randomFour.push(person)
      }
    }
    return randomFour;
  }

  makeGuess(event) {
    let guess = event.target.text
    let gameOver = false;
    if ( guess === this.state.person.first_name ) {
      this.props.correct()
      let knownPeople = this.state.knownPeople
      knownPeople.push(this.state.person)
      console.log("known people count: " + knownPeople.length)
      console.log("people count: " + this.props.people.length)
      gameOver = knownPeople.length === this.props.people.length
      console.log("Guess, game over? " + gameOver)
      this.setState({ correct: true,
                      showFeedback: true,
                      knownPeople: knownPeople})
    } else {
      this.props.incorrect()
      this.setState({correct: false,
                     person: this.state.person.first_name,
                     guess: guess,
                     showFeedback: true})
    }
    this.nextTurn(gameOver)
  }

  nextTurn(gameOver) {
    if(gameOver){
      console.log("GAME OVER!")
      this.props.gameOver()
    } else {
      let person = this.getRandomPerson();
      let randomFour = _.shuffle(this.getRandomFour(person));
      this.setState({ person: person, choices: randomFour })
    }
  }


  render() {
    let choices = _.map(this.state.choices, (choice) => {
      return (
        <div key={choice.id} className="row">
          <a href="#"
             className="btn btn-info btn-lg col-md-6"
             onClick={ (event) => this.makeGuess(event) } >
              {choice.first_name}
             </a>
        </div>
      )
    })



    return (
      <div>
        <FeedbackBar  correct={this.state.correct}
                      guess={this.state.guess}
                      person={this.state.person.first_name}
                      show={this.state.showFeedback} />
        <div className="container">
          <div className="col-md-6">
            {
              !this.state.person.image_url.includes("missing") &&
              <img className="center-block" src={this.state.person.image_url} />
            }
            <p className="text-center"><strong>Secret answer:</strong> {this.state.person.first_name}</p>
          </div>
          <div className="col-md-6">
            {choices}
          </div>
        </div>
      </div>
    )
  }
}

export default Game
