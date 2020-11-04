import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Layout from '../layout';
import {isAuth} from '../../api/user/helpers/auth';
import list from '../../api/user/orders/list';

const Dashboard = () => {
    const [data, setData] = React.useState([]);
    const {user: {_id, name, email, role}, token} = isAuth();
    const initialize = async () => {
        try {
            setData(await list(_id, token));
        } catch (error) {
            setData({...data, error});
        }
    };

    React.useEffect(() => {
        initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            title='Dashboard'
            description={`Welcome back ${name}`}
            className='container'
        >
            <div className='row'>
                <div className='col-3'>
                    <div className='card'>
                        <h4 className='card-header'>Links</h4>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                <Link to='/cart' className='nav-link'>My cart</Link>
                            </li>
                            <li className='list-group-item'>
                                <Link to={`/profile/${_id}`} className='nav-link'>Edit profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='col-9'>
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

                    <div className='card mb-3'>
                        <h3 className='card-header'>
                            Purchase history
                        </h3>
                    </div>

                    {data.length < 1 ? (
                        <div className='alert alert-warning'>
                            No orders
                        </div>
                    ) : (
                        <>
                            <div className='alert alert-info'>
                                Total orders: {data.length}
                            </div>

                            {data.map(order => (
                                <div key={order._id} className='card mb-5'>
                                    <div className='card-header'>
                                        Order ID: <strong>{order._id}</strong>
                                    </div>
                                    <div className='card-body'>
                                        <div className='alert alert-info'>
                                            Products in order: {order.products.length}
                                        </div>
                                        <ul className='list-group mb-2'>
                                            <li className='list-group-item'>
                                                <strong>Current status:</strong> <strong className='text-success'>{order.status}</strong>
                                            </li>
                                            <li className='list-group-item'>
                                                <strong>Amount:</strong> ${order.amount}
                                            </li>
                                            <li className='list-group-item'>
                                                <strong>Ordered on: {moment(order.createdAt).fromNow()}</strong>
                                            </li>
                                            <li className='list-group-item'>
                                                <strong>Delivery to: {order.address}</strong>
                                            </li>
                                        </ul>

                                        {order.products.length > 0 && order.products.map(product => (
                                            <div key={product._id} className='card mb-1'>
                                                <div className='card-header'>Product</div>
                                                <div className='card-body'>
                                                    <ul className='list-group'>
                                                        <li className='list-group-item'>
                                                            <strong>Name:</strong> {product.name}
                                                        </li>
                                                        <li className='list-group-item'>
                                                            <strong>Price:</strong> {product.price}
                                                        </li>
                                                        <li className='list-group-item'>
                                                            <strong>Count:</strong> {product.count}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
