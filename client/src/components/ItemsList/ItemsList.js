import React, {Component} from 'react';
import './ItemsList.css';
import Item from '../Item/Item';
import ItemCount from '../ItemCount/ItemCount';


class ItemsList extends Component {
  constructor() {
    super();
    this.state = {
      sorted: null,
      buttonIcon: 'icon-sort-name-up'
    }
  }

  orderItems = (items, order) => {
    return this.makeItems(items
      .sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return -1 * order;
        }
        if (b.name.toUpperCase() > a.name.toUpperCase()) {
          return 1 * order;
        }
        return 0;
      })
    );
  }

  makeItems = (items) => {
    return items.map( (item, ind) => <Item key={`listItem${ind}`} updateItem={this.props.updateItem} item={item}/>);
  }

  createItems = (items) => {
    if (!this.state.sorted) {
      return this.makeItems(items);
    } else if (this.state.sorted === 'A-Z') {
      return this.orderItems(items, 1);
    } else {
      return this.orderItems(items, -1);
    }
  }

  sortItems = () => {
    const sorted = (!this.state.sorted || this.state.sorted === 'Z-A') ? 'A-Z' : 'Z-A';
    const buttonIcon = !(!this.state.sorted || this.state.sorted === 'Z-A') ? 'icon-sort-name-up' : 'icon-sort-name-down';
    this.setState({ sorted, buttonIcon});
  }

  render() {
    return (
      <div className="ItemsList">
        <h3>Garage Items: </h3>
        <ItemCount items={this.props.items} />
        <button onClick={this.sortItems}>Sort Items <i className={this.state.buttonIcon}></i></button>
        {this.createItems(this.props.items)}
      </div>
    )
  }
}

export default ItemsList;