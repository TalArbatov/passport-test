import React from 'react';
import PropTypes from 'prop-types'

const MyComponent = props => {
    return(
        <div>
            <h1>Name: {props.name}</h1>
        </div>
    )
}

MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
}

const withHeader = (WrappedComponent) => {
    return(
        (props) => {
            return(
                <div>
                    <p>Header</p>
                    <WrappedComponent {...props}></WrappedComponent>
                    
                </div>
            )
        }
    )
}


export default withHeader(MyComponent)