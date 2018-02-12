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
      items: [],
      fetched: false,
      showItems: false
    };
  }

  getGarageItems = async () => {
    const { items } = await getItems();
    this.setState({
      items,
      fetched: true
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
    if(!this.state.fetched) {
      this.getGarageItems();
    }
    
    if(this.state.open) {
      this.doorHelper('open', 'showItems', 2000);
    } else { 
      this.doorHelper('showItems', 'open', 200);
    }
  }

  doorHelper = (first, second, time) => {
    this.setState({
      [first]: !this.state[first]
    })
    setTimeout(() => {
      this.setState({
        [second]: !this.state[second]
      });
    }, time);
  }

  addItem = (item) => {
    this.setState({
      items: [...this.state.items, item]
    });
  }

  updateItem = (update) => {
    const itemIndex = this.state.items.findIndex( item => item.id === update.id);
    const items = this.state.items;
    items[itemIndex].cleanliness = update.cleanliness;

    this.setState({
      items
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Garage Bin <i className="icon-warehouse"></i></h1>
        {this.createGarageDoor()}
        {this.garageDoorButton()}
        {this.state.showItems &&
          <div>
            <Form addItem={this.addItem}/>
            <ItemsList updateItem={this.updateItem} items={this.state.items}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
