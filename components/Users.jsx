import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

class UserTable extends React.Component {
  constructor() {
    console.log(localStorage.getItem('authToken'));
    super();
    this.state = {
      headers: [
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'firstName',
          label: 'First Name'
        },
        {
          key: 'lastName',
          label: 'Last Name'
        }
      ],
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

  handleFilterValueChange(value) {
    // your filter logic
  }

  handleSortOrderChange (key, order) {
    // your sort logic
  }

  handleCellClick (value) {
    // your filter logic
  }

  handleCellDoubleClick(key, order) {
    // your sort logic
  }

  render() {
    return (
      <div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Education</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Current Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.data.map((user, i) => {
            return <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.dob}</TableCell>
              <TableCell>{user.education}</TableCell>
              <TableCell>{user.occupation}</TableCell>
              <TableCell>{user.currentLocation}</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          }  )}

        </TableBody>
      </Table>

    </div>

    );
  }
}

export default UserTable;
