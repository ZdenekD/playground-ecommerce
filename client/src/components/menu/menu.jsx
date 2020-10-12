import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

const Menu = () => (
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
        </ul>
    </nav>
);

export default withRouter(Menu);
