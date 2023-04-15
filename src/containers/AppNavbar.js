import React, { useState } from 'react';
import {Navbar, NavbarBrand, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import './../styles/NavBar.css';
import logo from "./../assets/baylor_logo.png";


function AppNavbar(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const logout = () => {
        localStorage.clear();
    }

    return ( 
        <Navbar className="color-nav" dark expand="md">
            <div>
                <img width={40} height={40} src={logo} />
                <NavbarBrand tag={Link} to="/home">Home</NavbarBrand>
            </div>
            {props.isLoggedIn 
            ? <NavbarBrand onClick={logout} tag={Link} to="/login">Logout</NavbarBrand> 
            : null}
\       </Navbar>
    );
}

export default AppNavbar