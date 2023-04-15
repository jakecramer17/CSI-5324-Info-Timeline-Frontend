import { React, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar.js';
import fetcher from './../helpers/fetcher.js'
import './../styles/CreatePost.css'

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [isPost, setIsPost] = useState(true);

  function validateForm() {
    return title.length > 0 && description.length > 0;
  }

  const submitPost = async (event) => {
    event.preventDefault();

    console.log(event.target.elements);

    //reqres registered sample user
    const postPayload = {
      "title": event.target.elements.exampleTitle.value,
      "desciption": event.target.elements.exampleDescription.value
    }
    console.log(postPayload);

    await fetcher(`/api/posts/create`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postPayload)
    })
    .then(response => response.json())
    .then((data) => {
        console.log("Post added: " + JSON.stringify(data));
        navigate('/manager/myposts');
    });
  }

  return (
    <div>
      <AppNavbar isLoggedIn={true}/>
      <Form onSubmit={submitPost}>
        <div className="wrapper">
          <FormGroup>
            <Label for="exampleTitle">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} 
              name="title" id="exampleTitle" placeholder="Make it an interesting one!" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDescription">Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} 
                type="textarea" name="text" id="exampleDescription" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Background Image</Label>
            <Input value={image} onChange={(e) => setImage(e.target.value)} 
              type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              Upload an image to appear as the background of your post!
              Supported formats are PNG and JPG.
            </FormText>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Content Type</legend>
            <FormGroup check>
              <Label check>
                <Input checked={isPost} onChange={(e) => setIsPost(e.target.value)} 
                  type="radio" name="radio1" />{' '}
                Post
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Event
              </Label>
            </FormGroup>
          </FormGroup>
          {/* <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Check me out
            </Label>
          </FormGroup> */}
          <Button disabled={!validateForm()}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreatePost;