import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';
import fetcher from './../helpers/fetcher.js'

/**
 * Basic page for fetching, displaying, and deleting posts.
 */
function ReviewList() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // TODO: Fetch endpoint needs to point to our timeline backend endpoint
        fetch('/api/posts/status/SUBMITTED')
            .then(response => response.json())
            .then(data => {
                let updatedPosts = [...posts, ...data];
                setPosts(updatedPosts);
                console.log("All posts: " + data);
            });
    }, []);

    const approvePost = async (id) => {
        await fetcher(`/api/posts/update/${id}/ACCEPTED`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(() => {
            let updatedPosts = [...posts].filter(i => i.id !== id);
            setPosts(updatedPosts);
        });
    }

    const rejectPost = async (id) => {
        await fetcher(`/api/posts/update/${id}/REJECTED`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(() => {
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
            <td>{post.status}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" onClick={() => approvePost(post.id)}>Approve</Button>
                    <Button size="sm" color="danger" onClick={() => rejectPost(post.id)}>Reject</Button>
                    <Button size="sm" color="success">View Post</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar isLoggedIn={true}/>
            <Container fluid>
                <h3>Posts In Review</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Title</th>
                        <th width="30%">Description</th>
                        <th width="10%">Status</th>
                        <th width="30%">Actions</th>
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

export default ReviewList;