import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { history } from './helpers/history';
import Home from './containers/Home';
import Login from './containers/Login';
import UserList from './containers/UserList';
import PostList from './containers/PostList';
import Timeline from './containers/Timeline';
import CreatePost from './containers/CreatePost';
import CreateUser from './containers/CreateUser';
import ReviewList from './containers/ReviewList';
import TimelineManager from './containers/TimelineManager';
import RouteGuard from "./containers/RouteGuard"
// import ClientEdit from "./ClientEdit";

function App() {
  
  return (
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<Timeline/>}/>
          <Route path='/home' exact={true} element={
              <RouteGuard>
                <Home/>
              </RouteGuard>
            }
          />
          <Route path='/manager/users' exact={true} element={
              <RouteGuard>
                <UserList/>
              </RouteGuard>
            }
          />
          <Route path='/manager/posts/review' exact={true} element={
              <RouteGuard>
                <ReviewList/>
              </RouteGuard>
            }
          />
          <Route path='/manager/myposts' exact={true} element={
              <RouteGuard>
                <PostList/>
              </RouteGuard>
            }
          />
          <Route path='/manager/posts/create' exact={true} element={
              <RouteGuard>
                <CreatePost/>
              </RouteGuard>
            }
          />
          <Route path='/manager/users/create' exact={true} element={
              <RouteGuard>
                <CreateUser/>
              </RouteGuard>
            }
          />
          <Route path='/manager/timeline' exact={true} element={
              <RouteGuard>
                <TimelineManager/>
              </RouteGuard>
            }
          />
          <Route path='/login' exact={true} element={<Login/>}/>
          {/* <Route path='/clients/:id' component={ClientEdit}/> */}
        </Routes>
      </Router>
  )
}

export default App;
