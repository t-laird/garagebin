import React, { Component } from 'react';
import GarageDoor from './components/GarageDoor/GarageDoor';
import Form from './components/Form/Form';
import ItemsList from './components/ItemsList/ItemsList';
import './App.css';
import { getItems } from './helpers/helpers';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      open: false,
      items: []
    };
  }

  async componentDidMount () {
    const { items } = await getItems();
    this.setState({
      items
    })
  }

  createGarageDoor() {
    const openClass = this.state.open ? 'open' : 'closed';
    
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

  addItem = (item) => {
    this.setState({
      items: [...this.state.items, item]
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <h1 className={this.state.open ? 'down' : 'up'}>Garage Bin</h1>
        {this.createGarageDoor()}
        {this.garageDoorButton()}
        <Form addItem={this.addItem}/>
        <ItemsList items={this.state.items}/>
        
      </div>
    );
  }
}

export default App;
