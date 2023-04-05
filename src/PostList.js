import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';

/**
 * Basic page for fetching, displaying, and deleting posts.
 */
function PostList() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // TODO: Fetch endpoint needs to point to our timeline backend endpoint
        fetch('/manager/items')
            .then(response => response.json())
            .then(data => setPosts(data));
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
            let updatedPosts = [...posts].filter(i => i.id !== id);
            setPosts(updatedPosts);
        });
    }
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const postList = posts.map(post => {
        return <tr key={post.id}>
            <td style={{whiteSpace: 'nowrap'}}>{post.name}</td>
            <td>{post.name}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/manager/items/" + post.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(post.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/manager/items/new">Add Post</Button>
                </div>
                <h3>Posts</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th width="30%">Description</th>
                        <th width="40%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default PostList;