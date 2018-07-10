import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

class App extends React.Component {

  render() {
    return (

      <div>

        <Header/>

      </div>
    );
  }
}

class UserTable extends React.Component {
  constructor() {
    console.log(localStorage.getItem('authToken'));
    super();
    this.state = {
      data: []
    };

    fetch('http://localhost:3000/users', {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('authToken') }
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response);
      this.setState({
        data: response.data
      });
      // this.state = { data: response.data };
      /*
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
      }*/
    }).catch ((error) => {
      console.log('In Error');
    });

    /*this.state = {
      data: [
        {
          "id": 1,
          "name": "frodo",
          "age": 20
        },
        {
          "id": 2,
          "name": "sam",
          "age": 22
        },
        {
          "id": 3,
          "name": "pippin",
          "age": 16
        },
        {
          "id": 4,
          "name": "merry",
          "age": 18
        }
      ]
    }*/
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Education</th>
            <th>Occupation</th>
            <th>Current Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((user, i) => <UserTableRow key = {i} data = {user} /> )}
        </tbody>
      </table>
    );
  }
}

class UserTableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.email}</td>
        <td>{this.props.data.firstName}</td>
        <td>{this.props.data.lastName}</td>
        <td>{this.props.data.dob}</td>
        <td>{this.props.data.education}</td>
        <td>{this.props.data.occupation}</td>
        <td>{this.props.data.currentLocation}</td>
        <td></td>
      </tr>
    )
  }
}

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

class Header extends React.Component {
  render() {
    var margintop = {
      "margin-top": "100px"
    }
    return (
      <div>
          <Router>
            <div>
              <AppBar title='sss'>
                <Tabs>
                  <Tab label="Home" component={Link} to="/" />
                  <Tab label="Users" component={Link} to="/users" />
                </Tabs>
              </AppBar>
              <div style={margintop}>
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route path='/users' component={UserTable} />
                </Switch>
              </div>
            </div>
          </Router>

      </div>
    );
  }
}

export default App;
