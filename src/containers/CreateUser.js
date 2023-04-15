import { React, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar.js';
import fetcher from './../helpers/fetcher.js'
import './../styles/CreateUser.css'

function CreateUser() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0
      && confirmPassword.length > 0 && password == confirmPassword;
  }

  const submitUser = async (event) => {
    event.preventDefault();

    console.log(event.target.elements);

    //reqres registered sample user
    const userPayload = {
      "email": event.target.elements.exampleEmail.value,
      "firstName": event.target.elements.exampleFirstName.value,
      "lastName": event.target.elements.exampleLastName.value,
      "password": event.target.elements.examplePassword.value
    }
    console.log(userPayload);

    await fetcher(`/api/users/create`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userPayload)
    })
    .then(response => response.json())
    .then(() => {
        console.log("User added");
        navigate('/manager/users');
    });
  }

  return (
    <div>
      <AppNavbar isLoggedIn={true}/>
      <Form onSubmit={submitUser}>
        <div className="wrapper">
          <h3>Create Account</h3>
          <FormGroup>
            <Label for="exampleFirstName">First Name</Label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} 
              type="firstName" name="firstName" id="exampleFirstName" placeholder="first name" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleLastName">Last Name</Label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} 
              type="lastName" name="lastName" id="exampleLastName" placeholder="last name" />
          </FormGroup>
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
                type="password" name="password" id="confirmPassword" placeholder="confirm password" />
            </FormGroup>
          <Button disabled={!validateForm()}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateUser;