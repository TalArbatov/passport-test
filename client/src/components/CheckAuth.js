import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CheckAuth = props => {
    const [getSigned, setSigned] = useState(false)
    useEffect(() => {
        axios.get('/api/auth/protected').then(res => {
            setSigned(true)
        }).catch(err => {
            setSigned(false)
        })
    })
    
    return(
        <div>
            {getSigned ? <p>Logged in!</p> : <p>Logged out</p>}
        </div>
    )
}

export default CheckAuth;