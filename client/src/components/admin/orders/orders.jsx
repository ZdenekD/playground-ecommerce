/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Layout from '../../layout';
import {isAuth} from '../../../api/user/helpers/auth';
import list from '../../../api/admin/orders/list';
import statuses from '../../../api/admin/orders/statuses';
import updateStatus from '../../../api/admin/orders/updateStatus';

const Orders = () => {
    const [data, setData] = React.useState([]);
    const [values, setValues] = React.useState([]);
    const {user, token} = isAuth();
    const initialize = async () => {
        try {
            setData(await list(user._id, token));
        } catch (error) {
            setData({...data, error});
        }
    };
    const getStatuses = async () => {
        try {
            setValues(await statuses(user._id, token));
        } catch (error) {
            setData({...data, error});
        }
    };
    const handleChange = async (event, order) => {
        try {
            await updateStatus(user._id, token, order._id, event.target.value);

            initialize();
        } catch (error) {
            setData({...data, error});
        }
    };

    React.useEffect(() => {
        initialize();
        getStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            title='Orders'
            description='Orders administration'
            className='container col-md-8 offset-md-2'
        >
            <nav aria-label='breadcrumb' className='mb-5'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/admin/dashboard'>Dashboard</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                        Orders list
                    </li>
                </ol>
            </nav>

            {data.error && (
                <div className='alert alert-danger'>
                    {data.error}
                </div>
            )}

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

                                        <div className='form-group mt-3'>
                                            <select
                                                name='values'
                                                id='values'
                                                className='form-control'
                                                onChange={event => handleChange(event, order)}
                                            >
                                                <option defaultValue=''>Update status</option>
                                                {values && values.map((status, index) => (
                                                    <option key={index} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </li>
                                    <li className='list-group-item'>
                                        <strong>Transaction ID:</strong> {order.transactionId}
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
                                                    <strong>ID:</strong> {product._id}
                                                </li>
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
        </Layout>
    );
};

export default Orders;
