import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';

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
        },
        {
          key: 'dob',
          label: 'Date of Birth'
        },
        {
          key: 'education',
          label: 'Education'
        },
        {
          key: 'occupation',
          label: 'Occupation'
        },
        {
          key: 'currentLocation',
          label: 'Current Location'
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

  }
  createSortHandler(key) {
    const orderBy = key;
    let order = 'desc';

    if (this.state.orderBy === key ) {
      if (this.state.order === 'desc') {
        order = 'asc';
      } else {
        order = 'desc';
      }
    } else {
      order = 'asc';
    }
  }

  render() {
    /*<Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
    >
      <TableSortLabel
        active={orderBy === column.key}
        direction={order}
        onClick={this.createSortHandler(column.key)}
      >*/
     /*{column.label}*/ /*</TableSortLabel></Tooltip>*/
    const orderBy = 'email';
    const order = 'asc';
    console.log(this.state.headers);
    return (
      <div>

      <Table>
        <TableHead>
          <TableRow>
            {this.state.headers.map( (column) => {
              return <TableCell>
                <TableSortLabel active={orderBy === column.key}
                  direction={order}
                  onClick={this.createSortHandler(column.key)}>
                  {column.label} {column.key}
                </TableSortLabel></TableCell>
            })}

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


    <TablePagination
          component="div"
          count={12}
          rowsPerPage={5}
          page={1}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}

        />
      </div>
    );
  }
}

export default UserTable;
