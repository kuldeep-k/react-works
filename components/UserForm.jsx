import React from 'react';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'frodo'
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({user: {
      name: event.target.value
    }})
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name : <input type="text" value={this.state.user.name} onChange={this.handleChange} /> </label>
        <input type="submit" value="Submit" />O()
      </form>
    );
  }
}

export default UserForm;
