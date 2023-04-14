import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';

/**
 * Basic page for fetching, displaying, and deleting users.
 */
function UserList() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // TODO: Fetch endpoint needs to point to our timeline backend endpoint
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const remove = async (id) => {
        // TODO: Fetch endpoint needs to point to our timeline backend endpoint
        await fetch(`/api/users/remove/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedUsers = [...users].filter(i => i.id !== id);
            setUsers(updatedUsers);
        });
    }
    
    const create = async () => {
        await fetch(`/api/users/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "firstName": "Jake",
                    "lastName": "Cramer",
                    "email": "jake.cramer@baylor.edu",
                    "password": "password"
                })
        })
        .then(response => response.json())
        .then((data) => {
            let updatedUsers = [...users, data]
            setUsers(updatedUsers)
        });
    }


    if (isLoading) {
        return <p>Loading...</p>;
    }

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
            <AppNavbar/>
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