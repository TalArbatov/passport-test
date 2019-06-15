import React, {useEffect} from 'react';
import axios from 'axios'
import Signup from './Signup';

const App = props => {
  useEffect(() => {
    axios.get('/api/auth/test')
    .then(res => {
      console.log(res.data)
    })
  })

  return(
    <div>
      <h1>App</h1>
      <Signup />
    </div>
  )
}

export default App;