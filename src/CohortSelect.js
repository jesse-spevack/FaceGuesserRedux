import React, { Component } from 'react';

class CohortSelect extends React.Component {
  constructor() {
    super();
    this.state = { cohort: '' }
  }

  selectCohort(event) {
    const cohort = event.target.value;
    this.setState({cohort: cohort})
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-4 col-md-offset-4">
          <div className="form-group">
            <label>Select cohort:</label>
            <select
              value={this.state.value}
              onChange={ (event) => this.selectCohort(event) }
              className="form-control">
                <option> -- select a cohort -- </option>
                <option value="1606">1606</option>
                <option value="1608">1608</option>
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={ () => this.props.startGame(this.state.cohort) }>
            Start!
          </button>
        </div>
      </div>
    );
  }
}

export default CohortSelect;
