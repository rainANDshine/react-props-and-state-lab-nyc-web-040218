import React from 'react';

class Filters extends React.Component {
  constructor() {
    super();
  }

  changeName(name) {
    return name[0].toUpperCase() + name.slice(1) + "s";
  }

  render() {
    return (
      <div className="ui form">
        <h3>Animal type</h3>
        <div className="field">
          <select name="type" id="type" onChange={this.props.onChangeType}>
            <option value="all">All</option>
            {this.props.filters.map((each, index) => <option key={index} value={each}>{this.changeName(each)}</option>)}
          </select>
        </div>

        <div className="field">
          <button className="ui secondary button" onClick={this.props.onFindPetsClick}>Find pets</button>
        </div>
      </div>
    );
  }
}

export default Filters;
