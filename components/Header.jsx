import React from 'react';
import { BrowserRouter as Router, browserHistory, Route, Switch, Link, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import UserForm from './UserForm.jsx';
import UserTable from './Users.jsx';
import Login from './Login.jsx';

class Header extends React.Component {
  render() {
    var margintop = {
      "margin-top": "100px"
    }
    return (
      <div>
          <Router history={browserHistory}>
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

export default Header;
