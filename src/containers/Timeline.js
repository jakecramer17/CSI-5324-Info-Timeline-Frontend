import './../App.css';
import './../styles/Styles.css'
import AppNavbar from './AppNavbar.js';
import Post from './Post.js'
import { Link } from 'react-router-dom';
import { Label, Button, Container } from 'reactstrap';
import { Banner } from "./Banner";
import { useState, useEffect } from 'react'

const images = [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    "https://media.istockphoto.com/photos/the-main-attraction-of-paris-and-all-of-europe-is-the-eiffel-tower-in-picture-id1185953092?k=6&m=1185953092&s=612x612&w=0&h=SNiShskOfwQ7Sys5TX0eb5eBxHobktWUfZGrox5LMyk=",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
  ].map((image) => ({
    id: crypto.randomUUID(),
    image
  }));

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
                {/* <Post/> */}
                <Banner images={images} speed={240000} />
            </Container>
        </div>
    );
}

export default Timeline;