import React, {Component} from 'react';
import './Form.css';
import { addItem } from '../../helpers/helpers';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      reason: '',
      cleanliness: 'Sparkling',
      submitMsg: null
    }
  }

  handleInput = (event) => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async () => {
    const {name, reason, cleanliness} = this.state;
    const attemptAdd = await addItem({
      name, reason, cleanliness
    });

    if (attemptAdd.status === 'Success') {
      this.submitSuccess(attemptAdd, name, reason, cleanliness);
    } else {
      this.setState({
        submitMsg: <h4>Failed to add the item to your garage: {attemptAdd.error}</h4>
      })
    }

    setTimeout(() => {
      this.setState({
        submitMsg: null
      });
    }, 3000)
  }


  submitSuccess = (attemptAdd, name, reason, cleanliness) => {
    this.setState({
      submitMsg: <h4>Successfully added {name} to your garage</h4>,
      name: '',
      reason: '',
      cleanliness: 'Sparkling'
    })
    this.props.addItem({
      id: attemptAdd.id, name, reason, cleanliness
    });
  }

  render() {
    return (
      <div className="Form">
        <h3>Add Item to Garage: </h3>
        {this.state.submitMsg}
        <input type="text" name="name" value={this.state.name} placeholder="Item Name" onChange={this.handleInput}/>
        <input type="text" name="reason" value={this.state.reason} placeholder="Reason it's in the Garage" onChange={this.handleInput}/>
        <div className="conditionContainer">
          Condition: 
          <select name="cleanliness" value={this.state.cleanliness} onChange={this.handleInput}>
            <option value="Sparkling">Sparkling</option>
            <option value="Dusty">Dusty</option>
            <option value="Rancid">Rancid</option>
          </select>
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default Form;