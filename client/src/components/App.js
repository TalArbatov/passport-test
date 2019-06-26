import React, { useEffect } from "react";
import axios from "axios";
import Signup from "./Signup";
import Login from "./Login";
import ProtectedButton from "./ProtectedButton";
import utils from "../utils";
import CheckAuth from './CheckAuth'

class App extends React.Component {
  componentWillMount() {
    console.log(`TOKEN \n ${localStorage.token}`);
    const token = localStorage.getItem('token');
    if(token && token !== '') {
      utils.setAuthorizationToken(localStorage.token);
      //get new token from server
      axios.get('/api/auth/me/from/token').then(res => {
        console.log(res.data);

        //set new token
        utils.setAuthorizationToken(res.data.token)
      })
    }
    //if (localStorage.token) utils.setAuthorizationToken(localStorage.token);

  }
  render() {
    return (
      <div>
        <CheckAuth></CheckAuth>
        <Signup />
        <Login />
        <ProtectedButton />
      </div>
    );
  }
}
export default App;
