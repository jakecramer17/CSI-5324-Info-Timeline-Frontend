import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import UserList from './containers/UserList';
import PostList from './containers/PostList';
import Timeline from './containers/Timeline';
import CreatePost from './containers/CreatePost';
import CreateUser from './containers/CreateUser';
import ReviewList from './containers/ReviewList';
import PostManager from './containers/PostManager';
// import ClientEdit from "./ClientEdit";

function App() {
  
  return (
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<Timeline/>}/>
          <Route path='/home' exact={true} element={<Home/>}/>
          <Route path='/manager/users' exact={true} element={<UserList/>}/>
          <Route path='/manager/myposts' exact={true} element={<PostList/>}/>
          <Route path='/manager/posts/review' exact={true} element={<ReviewList/>}/>
          <Route path='/manager/posts/create' exact={true} element={<CreatePost/>}/>
          <Route path='/manager/users/create' exact={true} element={<CreateUser/>}/>
          <Route path='/manager/posts' exact={true} element={<PostManager/>}/>
          <Route path='/login' exact={true} element={<Login/>}/>
          {/* <Route path='/clients/:id' component={ClientEdit}/> */}
        </Routes>
      </Router>
  )
}

export default App;
