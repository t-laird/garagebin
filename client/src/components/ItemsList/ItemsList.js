import React, {Component} from 'react';
import './ItemsList.css';
import Item from '../Item/Item';


class ItemsList extends Component {
  constructor() {
    super();
    this.state = {
      sorted: null,
      buttonText: 'A-Z'
    }
  }

  createItems = (items) => {
    console.log(items);
    if (!this.state.sorted) {
      return items.map( (item, ind) => <Item key={`listItem${ind}`} item={item}/>);
    } else if (this.state.sorted === 'A-Z') {
      return items
        .sort((a, b) => a.name > b.name)
        .map( (item, ind) => <Item key={`listItem${ind}`} item={item}/>);
    } else {

      return items
      .sort((a, b) => b.name > a.name)
      .map( (item, ind) => <Item key={`listItem${ind}`} item={item}/>);
    }
  }

  sortItems = () => {
    const sorted = (!this.state.sorted || this.state.sorted === 'Z-A') ? 'A-Z' : 'Z-A';
    const buttonText = !(!this.state.sorted || this.state.sorted === 'Z-A') ? 'A-Z' : 'Z-A';
    this.setState({ sorted, buttonText});
  }

  render() {
    return (
      <div className="ItemsList">
        <h3>Garage Items: </h3>
        <ItemCount items={this.props.items} />
        <button onClick={this.sortItems}>Sort Items ({this.state.buttonText})</button>
        {this.createItems(this.props.items)}
      </div>
    )
  }
}

export default ItemsList;