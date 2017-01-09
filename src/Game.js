import                React from 'react';
import _              from 'lodash'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = { person: this.getRandomPerson() };
  }

  componentWillMount() {
    let randomFour = this.getRandomFour(this.state.person);
    this.setState( { choices: randomFour })
  }

  getRandomPerson() { return _.sample(this.props.people) }

  getRandomFour(person) {
    console.log("Person = " + this.state.person.first_name)
    let randomFour = [person];
    while (randomFour.length < 4 ) {
      let person = _.sample(this.props.people)
      if (randomFour.indexOf(person) === -1) {
        randomFour.push(person)
      }
    }
    console.log("Random 4 = " + randomFour[0].first_name + " " + randomFour[1].first_name + " " + randomFour[2].first_name + " " + randomFour[3].first_name)
    return randomFour;
  }

  makeGuess(event) {
    let guess = event.target.text
    if ( guess === this.state.person.first_name ) {
      this.props.correct()
    } else {
      this.props.incorrect()
    }
    this.nextTurn()
  }

  nextTurn() {
    let person = this.getRandomPerson();
    let randomFour = this.getRandomFour(person);
    this.setState({ person: person, choices: randomFour })
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
        <div className="container">
          <div className="col-md-6">
            <img src={this.state.person.image_url} />
            <p>{this.state.person.first_name}</p>
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
