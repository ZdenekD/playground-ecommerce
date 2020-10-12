import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import signOut from '../../api/user/signout';
import {isAuth} from '../../api/user/auth';

const Menu = ({history}) => {
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

Menu.propTypes = {history: ReactRouterPropTypes.history.isRequired};

export default withRouter(Menu);
