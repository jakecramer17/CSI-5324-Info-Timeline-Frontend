import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import UserList from './UserList';
import PostList from './PostList';
import Timeline from './Timeline';
// import ClientEdit from "./ClientEdit";

function App() {
  
  return (
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<Timeline/>}/>
          <Route path='/home' exact={true} element={<Home/>}/>
          <Route path='/manager/users' exact={true} element={<UserList/>}/>
          <Route path='/manager/posts' exact={true} element={<PostList/>}/>
          {/* <Route path='/clients/:id' component={ClientEdit}/> */}
        </Routes>
      </Router>
  )
}

export default App;
