import React, { Component } from 'react';
import GarageDoor from './components/GarageDoor/GarageDoor';
import Form from './components/Form/Form';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      open: false
    };
  }

  createGarageDoor() {
    const openClass = this.state.open ? 'open' : 'closed';
    const buttonText = this.state.open ? 'Lower Door' : 'Raise Door';
    
    return (
      <GarageDoor status={openClass} />
    );
  }

  garageDoorButton() {
    const buttonText = this.state.open ? 'Lower Door' : 'Raise Door';
    return <button className="doorControl" onClick={this.changeDoorStatus}>{buttonText}</button>

  }

  changeDoorStatus = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Garage Bin</h1>
        {this.createGarageDoor()}
        {this.garageDoorButton()}
        <Form />
        
      </div>
    );
  }
}

export default App;
