import React, {useEffect,useState} from 'react';
import axios from 'axios';

const Signup = props => {
  const [getState, setState] = useState({
    email: '',
    password: ''
  })

  const changeForm = (input, type) => {
    setState({...getState, [type]: input})
  }

  const onSubmit = () => {
    console.log(getState);
    axios.post('/api/auth/local-signup', getState).then(res => {
      console.log(res.data)
    })
  }

  return(
    <div>
      <label>email:</label>
      <input type='text' onChange={(e) => changeForm(e.target.value, 'email')}></input>

      <label>password:</label>
      <input type='password' onChange={(e) => changeForm(e.target.value, 'password')}></input>

      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  )
}

export default Signup