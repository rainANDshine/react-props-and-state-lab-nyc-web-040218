import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      },
      types: []
    };
  }

  componentDidMount() {
    fetch("/api/pets").then(r => r.json()).then(pets => {
      const types = pets.map(pet => pet.type).filter((value, index, arr) => arr.indexOf(value) === index);
      this.setState({ pets, types })
    })
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const type = this.state.filters.type;
  //   const url = `?type=${type}`;
  //   if (type !== prevState.filters.type) {
  //     if (type === 'all') {
  //       fetch("/api/pets").then(r => r.json()).then(pets => {this.setState({ pets })})
  //     } else {
  //       fetch("/api/pets" + url).then(r => r.json()).then(pets => {this.setState({ pets })})
  //     }
  //   }
  // }

  adoptPet = id => {
    const adoptedPets = this.state.adoptedPets;
    adoptedPets.push(id);
    this.setState({ adoptedPets });
  }

  changeType = event => {
    this.setState({
      filters: {type: event.target.value}
    })
  }

  findPets = () => {
    const type = this.state.filters.type;
    const url = `?type=${type}`
    if (type === 'all') {
      fetch("/api/pets").then(r => r.json()).then(pets => {this.setState({ pets })})
    } else {
      fetch("/api/pets" + url).then(r => r.json()).then(pets => {this.setState({ pets })})
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.types} onChangeType={this.changeType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} adoptedPets={this.state.adoptedPets}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
