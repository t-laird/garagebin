import React, {Component} from 'react';
import './Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="Form">
        <input type="text" name="name" value={this.state.name} />
        <input type="text" name="name" value={this.state.name} />
        <select>
          <option value="Sparkling">Sparkling</option>
          <option value="Dusty">Dusty</option>
          <option value="Rancid">Rancid</option>
        </select>
        <button>Submit</button>
      </div>
    )
  }
}

export default Form;