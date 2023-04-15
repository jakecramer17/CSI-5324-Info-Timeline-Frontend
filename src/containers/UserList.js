import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';
import fetcher from './../helpers/fetcher.js'

/**
 * Basic page for fetching, displaying, and deleting users.
 */
function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetcher('/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                console.log("All users: " + JSON.stringify(data));
            });
    }, []);

    const userList = users.map(user => {
        return <tr key={user.id}>
            <td style={{whiteSpace: 'nowrap'}}>{user.firstName}</td>
            <td>{user.email}</td>
            <td>
                <Button size="sm" color="primary">Send Message</Button>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar isLoggedIn={true}/>
            <Container fluid>
                <h3>Account Management</h3>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/manager/users/create">Create Account</Button>
                </div>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th width="30%">Email</th>
                        <th width="40%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default UserList;