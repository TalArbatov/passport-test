import React, { useEffect, useState } from "react";
import axios from "axios";
import utils from "../utils";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from "react-google-login";
import config from "../../../config";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";

const FacebookButton = styled.button`
margin: 10px 10px;
box-sizing: border-box;
position: relative;
cursor:pointer;
/* width: 13em;  - apply for fixed size */
padding: 0 15px 0 46px;
border: none;
text-align: left;
line-height: 34px;
white-space: nowrap;
border-radius: 0.2em;
font-size: 16px;
color: #FFF;
background-color: #4C69BA;
background-image: linear-gradient(#4C69BA, #3B55A0);
text-shadow: 0 -1px 0 #354C8C;
&:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
&:focus {
  outline: none;
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);

}
&:hover {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);

}
&:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

`



const LoginTitle = styled.p`
  font-family:Gisha;
  font-weight:100;
  color: #2f2f2f;
  font-size: 1.3em;
  margin:0;
  margin-bottom:25px;
`
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Window = styled.div`
  padding:25px;
  border-radius: 10px;
  border: 1px solid black;
  display:flex;
  flex-direction:column;
  justify-content:center;
  div {
    display:flex;
    justify-content:center;
  }
`;

const SubmitDiv = styled.div`
dispay:flex;
flex-direction:row;
align-items:center;
a {
  text-decoration:none;
  font-family:Gisha;
  font-size:0.9em
  font-weight:500;
}
`

const SubmitButton = styled.div`
  cursor:pointer;
  height:30px;
  border-radius:20px;
  background:white;
  color:#1ECD97;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:4px 20px; 
  margin:10px;
  font-family:Gisha;
  border: 2px solid #1ECD97;
  transition:0.3s;
  &:hover {
    background: #1ECD97;
    color: white;

  }
`

const Login = props => {
  const { classes } = props;

  const [getState, setState] = useState({
    email: "",
    password: ""
  });

  const changeForm = (input, type) => {
    setState({ ...getState, [type]: input });
  };

  const onSubmit = () => {
    axios
      .post("/api/auth/local-login", getState)
      .then(res => {
        console.log(res.data);
        utils.setAuthorizationToken(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const facebookResponse = response => {
    console.log(response.accessToken);
    axios
      .get(`/api/auth/facebook-token?access_token=${response.accessToken}`)
      .then(res => {
        console.log(res.data);
        utils.setAuthorizationToken(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const googleResponse = response => {
    console.log(response.accessToken);
    axios
      .get(`/api/auth/google-token?access_token=${response.accessToken}`)
      .then(res => {
        console.log(res.data);
        utils.setAuthorizationToken(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onGoogleFailure = test => {
    console.log(test);
  };
  return (
    <Wrapper>
      <Window>
        <div>
          <LoginTitle>Login</LoginTitle>
        </div>
        <div>
          <TextField
                label="Email"
                margin="normal"
                variant="outlined"
                onChange={e => changeForm(e.target.value, "email")}
                classes={{ root: classes.inputs }}

              />
        </div>
        <div>
        <TextField
                type="password"
                label="Password"
                margin="normal"
                variant="outlined"
                onChange={e => changeForm(e.target.value, "password")}
                classes={{ root: classes.inputs }}

              />
        </div>
        <SubmitDiv>
        {/* <Fab
          variant="Submit"
          size="medium"
          color="secondary"
          aria-label="Add"
          classes={{ root: classes.submitButton }}
          onClick={onSubmit}
        >
          Submit
        </Fab> */}
        <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
        {/* <p onClick={test}>or login via facebook</p> */}
        {/* <a href="/api/auth/facebook">Facebook</a> */}
          <a href='#'>Forgot your password?</a>
        </SubmitDiv>
        <div>
          <FacebookLogin
            appId={"222214701852053"}
            fields="name,email,picture"
            callback={response => facebookResponse(response)}
            render={renderProps => (
              <FacebookButton onClick={renderProps.onClick}>Login with Facebook</FacebookButton>
            )}
          
          />
        </div>
        <div>
          <GoogleLogin
            clientId={"957424171854-chi7282in4nd51cpft17fcd1rtpv9rsq.apps.googleusercontent.com"}
            buttonText="Login with Google"
            onSuccess={googleResponse}
            autoLoad={false}
            onFailure={onGoogleFailure}
          />
        </div>
      </Window>
    </Wrapper>
  );
};
const styles = {
  
  inputs: {
    margin: "3px"
  },
  submitButton: {
    margin:"10px",
  }
};
export default withStyles(styles)(Login);
