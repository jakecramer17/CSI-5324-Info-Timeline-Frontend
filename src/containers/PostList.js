import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Label, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar.js';
import fetcher from './../helpers/fetcher.js'

/**
 * Basic page for fetching, displaying, and deleting posts.
 */
function PostList() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => {
                let updatedPosts = [...posts, ...data];
                setPosts(updatedPosts);
                console.log("All posts: " + data);
            });
    }, []);

    const removePost = async (id) => {
        await fetcher(`/api/posts/remove/${id}`, {
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
            <td style={{whiteSpace: 'nowrap'}}>{post.title}</td>
            <td>{post.desciption}</td>
            <td>{post.type}</td>
            <td>{post.status}</td>
            <td>
                {post.status == 'ACCEPTED'
                ? <Label style={{fontStyle: 'italic'}}>No Action</Label>
                : <ButtonGroup>
                      <Button size="sm" color="danger" onClick={() => removePost(post.id)}>Cancel</Button>
                  </ButtonGroup>}
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar isLoggedIn={true}/>
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