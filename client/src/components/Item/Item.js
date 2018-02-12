import React, {Component} from 'react';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    }
  }

  handleChange = (event) => {
    
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const {item} = this.props;

    return (
      <div className="Item">
        <h5 onClick={this.handleExpand}>Name: {item.name} </h5>
        {this.state.expanded && 
        <div className="itemDetails">
          <h5>Reason: {item.reason} </h5>
          <select name="cleanliness" value={item.cleanliness} onChange={this.handleChange}>
              <option value="Sparkling">Sparkling</option>
              <option value="Dusty">Dusty</option>
              <option value="Rancid">Rancid</option>
          </select>
        </div>        
        }
      </div>
    )
  }
}

export default Item;