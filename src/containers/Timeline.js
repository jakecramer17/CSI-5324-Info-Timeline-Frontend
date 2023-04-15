import './../App.css';
import './../styles/Styles.css'
import AppNavbar from './AppNavbar.js';
import Post from './Post.js'
import { Link } from 'react-router-dom';
import { Label, Button, Container } from 'reactstrap';
import { Banner } from "./Banner";
import { useState, useEffect } from 'react'

/**
 * Default screen when entering webpage. Use the "/home"
 * extension to interact with timeline features.
 */
function Timeline() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // TODO: Fetch endpoint needs to point to our timeline backend endpoint
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div>
            {/* <AppNavbar/> */}
            <Container fluid>
                {/* <Label color="black">Timeline</Label> */}
                <Banner posts={posts} speed={300000} />
            </Container>
        </div>
    );
}

export default Timeline;