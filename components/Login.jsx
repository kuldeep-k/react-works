import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      isEmailError: false,
      emailError: "",
      isPasswordError: false,
      passwordError: ""
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }
  handlePassChange(event) {
    this.setState({
      password: event.target.value
    })
  }
  handleSubmit(event) {
    // http://localhost:3000/auth/signIn
    event.preventDefault();
    console.log(this.state)
    fetch('http://localhost:3000/auth/signIn', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email, password: this.state.password })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response);
      /*this.setState({
        redirect: true
      })*/
      if(response.success === false ) {
        this.setState({
          isEmailError: true,
          emailError: response.msg,
        });
      } else {
        localStorage.setItem('authToken', response.token);
        this.setState({
          redirect: true
        });
      }

    }).catch ((error) => {
      console.log('In Error');
    });
  }

  render() {
    if (this.state.redirect) {
       return <Redirect to='/users'/>;
    }

    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <TextField
          error={this.state.isEmailError}
          errorText={this.state.emailError}
          id="email"
          label="Email Address"
          onChange={this.handleEmailChange}
          margin="normal"
        />
        <TextField
          error={this.state.isPasswordError}
          id="password"
          label="Password"
          onChange={this.handlePassChange}
          margin="normal"
        />
      <Button type="submit" variant="contained" className="primary">
        Submit
      </Button>
      </form>
    );
  }
}

export default Login;
