import { useState, useEffect } from 'react';
import './../App.css';
import AppNavbar from './AppNavbar.js';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import jwt from 'jwt-decode'

/**
 * Home screen we can use to navigate to different menus.
 */
function Home() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const payload = jwt(localStorage.getItem("token"));
    console.log(payload);
    if (payload.role === 'TIMELINE') {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, []);
  
    return (
        <div>
            <AppNavbar isLoggedIn={true}/>
            <Container fluid>
              {isAdmin
                ? <div>
                    <Button color="link"><Link to="/manager/users">Manage Accounts</Link></Button>
                    <Button color="link"><Link to="/manager/posts/review">Review Posts</Link></Button>
                    <Button color="link"><Link to="/manager/timeline">Manage Timeline</Link></Button>
                  </div>
                : <Button color="link"><Link to="/manager/myposts">My Posts</Link></Button>
              }
            </Container>
        </div>
    );
}

export default Home;