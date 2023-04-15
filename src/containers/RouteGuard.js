import React from 'react';
import { Route, Navigate } from 'react-router-dom';
// import Home from './Home';


const RouteGuard = ({ children }) => {
 
    const authed = hasJWT() // isauth() returns true or false based on localStorage

   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
      
       return flag
   }

   return authed ? children : <Navigate to="/login" />;
 
};
 
export default RouteGuard;