import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {isAuth} from '../api/user/helpers/auth';

const PrivateRoute = ({children, ...rest}) => (
    <Route
        {...rest}
    >
        {({location}) => (isAuth() ? (
            children
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: {from: location},
            }} />
        ))}
    </Route>
);

PrivateRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.node,
    ]),
    location: PropTypes.object,
};

export default PrivateRoute;
