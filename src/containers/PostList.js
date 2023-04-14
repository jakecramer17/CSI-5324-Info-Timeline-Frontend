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
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    const remove = async (id) => {
        await fetch(`/api/posts/remove/${id}`, {
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

    const create = async () => {
        await fetch(`/api/posts/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "title": "Test",
                    "desciption": "test post",
                    "tags": [{"tag": "test tag"}]
                })
        })
        .then(response => response.json())
        .then((data) => {
            let updatedPosts = [...posts, data]
            setPosts(updatedPosts)
        });
    }
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const postList = posts.map(post => {
        return <tr key={post.id}>
            <td style={{whiteSpace: 'nowrap'}}>{post.title}</td>
            <td>{post.desciption}</td>
            <td>{post.type}</td>
            <td>{post.status}</td>
            <td>
                <ButtonGroup>
                    {/* <Button size="sm" color="primary" tag={Link} to={"/manager/items/" + post.id}>Edit</Button> */}
                    <Button size="sm" color="danger" onClick={() => remove(post.id)}>Cancel</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <h3>My Posts</h3>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/manager/posts/create">Create Post</Button>
                </div>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Title</th>
                        <th width="40%">Description</th>
                        <th width="20%">Type</th>
                        <th width="20%">Status</th>
                        <th width="20%">Actions</th>
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