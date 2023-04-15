import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar.js';
import "./../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(event.target.elements);

    //reqres registered sample user
    const loginPayload = {
      "email": event.target.elements.emailInput.value,
      "password": event.target.elements.passwordInput.value
    }
    console.log(loginPayload);

    await fetch(`/auth/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginPayload)
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data.accessToken);

      //get token from response
      const token = data.accessToken;

      //set JWT token to local
      localStorage.setItem("token", token);

      //save JWT token to state
      setAuthToken(token);

      //redirect user to home page
      if (token != null) {
        navigate('/home');
      }
    })
    .catch(err => console.log(err));
}

  return (
    <div className="login">
      <AppNavbar isLoggedIn={false}/>
      <div className="wrapper">
        <h3>Timeline Console</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </FormGroup>
          <Button disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}