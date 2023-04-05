import './App.css';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

/**
 * Home screen we can use to navigate to different menus.
 */
function Home() {
    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <Button color="link"><Link to="/manager/users">Users</Link></Button>
                <Button color="link"><Link to="/manager/posts">Posts</Link></Button>
            </Container>
        </div>
    );
}

export default Home;