import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../layout';
import {isAuth} from '../../api/user/helpers/auth';

const Admin = () => {
    const {user: {name, email}} = isAuth();

    return (
        <Layout
            title='Admin dashboard'
            description={`Welcome back ${name}`}
            className='container'
        >
            <div className="row">
                <div className="col-3">
                    <div className='card'>
                        <h4 className='card-header'>Links</h4>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                <Link to='/admin/category/create' className='nav-link'>Create category</Link>
                            </li>
                            <li className='list-group-item'>
                                <Link to='/admin/product/create' className='nav-link'>Create product</Link>
                            </li>
                            <li className='list-group-item'>
                                <Link to='/admin/products/manage' className='nav-link'>Manage products</Link>
                            </li>
                            <li className='list-group-item'>
                                <Link to='/admin/orders' className='nav-link'>View orders</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-9">
                    <div className='card mb-5'>
                        <h3 className='card-header'>
                            Admin information
                        </h3>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                {name}
                            </li>
                            <li className='list-group-item'>
                                {email}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Admin;
