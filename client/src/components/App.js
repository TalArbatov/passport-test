import React, { useEffect } from "react";
import axios from "axios";
import Signup from "./Signup";
import Login from "./Login";
import ProtectedButton from "./ProtectedButton";
import utils from "../utils";
import CheckAuth from './CheckAuth'

class App extends React.Component {
  componentDidMount() {
    console.log(`TOKEN \n ${localStorage.token}`);
    
    if (localStorage.token) utils.setAuthorizationToken(localStorage.token);

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
