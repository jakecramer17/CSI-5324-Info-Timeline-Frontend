import { useState, useEffect } from 'react';
import './../App.css';
import AppNavbar from './AppNavbar.js';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

/**
 * Home screen we can use to navigate to different menus.
 */
function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [authToken, setAuthToken] = useState("");
 
  useEffect(() => {
    // Checking if user is not logged in
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <AppNavbar isLoggedIn={isLoggedIn}/>
            <Container fluid>
              {isAdmin
                ? <div>
                    <Button color="link"><Link to="/manager/users">Manage Accounts</Link></Button>
                    <Button color="link"><Link to="/manager/posts/review">Review Posts</Link></Button>
                    <Button color="link"><Link to="/manager/posts">Manage Posts</Link></Button>
                  </div>
                : <Button color="link"><Link to="/manager/myposts">My Posts</Link></Button>
              }
            </Container>
        </div>
    );
}

export default Home;