import React from 'react';
import axios from 'axios'
const ProtectedButton = props => {

    const fetchProtected = () => {
        axios.get('/api/auth/protected')
        .then(res => {
            console.log(res.data)
        })
        .catch(res => {
            console.log(res)
        })
    }

    return(
        <div>
            <button onClick={() => fetchProtected()}>FETCH</button>
        </div>
    )
}

export default ProtectedButton;