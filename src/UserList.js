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
        fetch('/manager/items')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const remove = async (id) => {
        // TODO: Fetch endpoint needs to point to our timeline backend endpoint
        await fetch(`/manager/items/${id}`, {
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
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const userList = users.map(user => {
        return <tr key={user.id}>
            <td style={{whiteSpace: 'nowrap'}}>{user.name}</td>
            <td>{user.name}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/manager/items/" + user.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(user.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/manager/items/new">Add User</Button>
                </div>
                <h3>Users</h3>
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