import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import signOut from '../../api/user/signout';
import {isAuth} from '../../api/user/helpers/auth';
import totalItems from '../cart/totalItems';

const Navigation = ({history}) => {
    const isAdmin = isAuth().user.role === 1;
    const handleSignOut = () => {
        signOut(() => {
            history.push('/');
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className='nav nav-pills nav-fill'>
                <li className='nav-item'>
                    <NavLink
                        exact
                        to='/'
                        className='nav-link'
                        activeClassName='nav-link active'
                    >
                        Home
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink
                        exact
                        to='/shop'
                        className='nav-link'
                        activeClassName='nav-link active'
                    >
                        Shop
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink
                        exact
                        to='/cart'
                        className='nav-link'
                        activeClassName='nav-link active'
                    >
                        Cart <sup className='badge badge-primary'>{totalItems()}</sup>
                    </NavLink>
                </li>

                {isAuth() && !isAdmin && (
                    <li className='nav-item'>
                        <NavLink
                            exact
                            to='/user/dashboard'
                            className='nav-link'
                            activeClassName='nav-link active'
                        >
                            Dashboard
                        </NavLink>
                    </li>
                )}

                {isAuth() && isAdmin && (
                    <li className='nav-item'>
                        <NavLink
                            exact
                            to='/admin/dashboard'
                            className='nav-link'
                            activeClassName='nav-link active'
                        >
                            Dashboard
                        </NavLink>
                    </li>
                )}

                {!isAuth() && (
                    <>
                        <li className='nav-item'>
                            <NavLink
                                exact
                                to='/signin'
                                className='nav-link'
                                activeClassName='nav-link active'
                            >
                                SignIn
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                exact
                                to='/signup'
                                className='nav-link'
                                activeClassName='nav-link active'
                            >
                                SignUp
                            </NavLink>
                        </li>
                    </>
                )}

                {isAuth() && (
                    <li className='nav-item'>
                        <button className='btn btn-link' onClick={handleSignOut}>
                            SignOut
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

Navigation.propTypes = {history: ReactRouterPropTypes.history.isRequired};

export default withRouter(Navigation);
