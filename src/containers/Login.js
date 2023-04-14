import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar.js';
import "./../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    // TODO: Check database. If login successful, navigate to home page
    navigate("/home");
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
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