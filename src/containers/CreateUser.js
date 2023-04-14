import { React, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar.js';
import './../styles/CreateUser.css'

function CreateUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0
      && confirmPassword.length > 0 && password == confirmPassword;
  }

  function submitUser() {
    if (validateForm()) {
      // Create post and navigate back
      navigate(-1);
    } else {
      // Warn user of invalid input
    }
  }

  return (
    <Form>
      <AppNavbar isLoggedIn={true}/>
      <div className="wrapper">
        <h3>Create Account</h3>
        <FormGroup>
          <Label for="exampleEmail">New Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} 
            type="email" name="email" id="exampleEmail" placeholder="name@example.com" />
        </FormGroup>
        <FormGroup>
            <Label for="examplePassword">New Password</Label>
            <FormText color="muted">
            Must have at least 6 characters
            </FormText>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} 
              type="password" name="password" id="examplePassword" placeholder="password" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Confirm Password</Label>
            <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
              type="password" name="password" id="examplePassword" placeholder="confirm password" />
          </FormGroup>
        <Button onClick={submitUser} disabled={!validateForm()}>
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default CreateUser;