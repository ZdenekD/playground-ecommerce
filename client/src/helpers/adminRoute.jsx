import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {isAuth} from '../api/user/auth';

const AdminRoute = ({children, ...rest}) => (
    <Route
        {...rest}
    >
        {({location}) => (isAuth() && isAuth().user.role === 1 ? (
            children
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: {from: location},
            }} />
        ))}
    </Route>
);

AdminRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.node,
    ]),
    location: PropTypes.object,
};

export default AdminRoute;
