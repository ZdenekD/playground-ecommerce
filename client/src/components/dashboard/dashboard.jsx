import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../layout';
import {isAuth} from '../../api/user/auth';

const Dashboard = () => {
    const {user: {name, email, role}} = isAuth();

    return (
        <Layout
            title='Dashboard'
            description={`Welcome back ${name}`}
            className='container'
        >
            <div className="row">
                <div className="col-3">
                    <div className='card'>
                        <h4 className='card-header'>Links</h4>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                <Link to='/cart' className='nav-link'>My cart</Link>
                            </li>
                            <li className='list-group-item'>
                                <Link to='/profile/update' className='nav-link'>Edit profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-9">
                    <div className='card mb-5'>
                        <h3 className='card-header'>
                            User information
                        </h3>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                {name}
                            </li>
                            <li className='list-group-item'>
                                {email}
                            </li>
                            <li className='list-group-item'>
                                {role === 1 ? 'Admin' : 'Registered user'}
                            </li>
                        </ul>
                    </div>

                    <div className='card mb-5'>
                        <h3 className='card-header'>
                            Purchase history
                        </h3>
                        <ul className='list-group'>
                            <li className='list-group-item'></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
