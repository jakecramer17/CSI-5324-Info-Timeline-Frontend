import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';

/**
 * Basic page for fetching, displaying, and deleting posts.
 */
function TimelineManager() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch('/api/posts/status/ACCEPTED')
            .then(response => response.json())
            .then(data => {
                let updatedPosts = [...posts, ...data];
                setPosts(updatedPosts);
                console.log("All posts: " + data);
            });
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
                    <Button size="sm" color="danger" onClick={() => remove(post.id)}>Remove</Button>
                    <Button size="sm" color="warning">Add to Timeline</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar isLoggedIn={true}/>
            <Container fluid>
                <h3>Timeline Management</h3>
                {/* <div className="float-right">
                    <Button color="success" tag={Link} to="/manager/posts/create">Create Post</Button>
                </div> */}
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="10%">Post</th>
                        <th width="40%">Description</th>
                        <th width="10%">Type</th>
                        <th width="10%">Status</th>
                        <th width="50%">Actions</th>
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

export default TimelineManager;