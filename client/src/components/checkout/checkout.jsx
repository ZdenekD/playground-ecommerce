import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import {isAuth} from '../../api/user/helpers/auth';
import get from '../../api/payment/token';
import process from '../../api/payment/process';
import emptyCart from '../cart/emptyCart';
import createOrder from '../../api/order/create';

const Checkout = ({products, setUpdate}) => {
    const initialState = {
        token: null,
        instance: {},
        address: '',
        success: false,
        error: '',
        loading: false,
    };
    const [data, setData] = React.useState(initialState);
    const userId = isAuth() && isAuth().user._id;
    const userToken = isAuth() && isAuth().token;
    const getToken = async (id, token) => {
        try {
            const {clientToken} = await get(id, token);

            setData({...data, token: clientToken});
        } catch (error) {
            setData({...data, error});
        }
    };
    const total = () => products.reduce((current, next) => current + next.count * next.price, 0);
    const handleClick = async () => {
        setData({...data, loading: true});

        try {
            const {nonce} = await data.instance.requestPaymentMethod();
            const values = {
                paymentMethodNonce: nonce,
                amount: total(),
            };

            const {transaction} = await process(userId, userToken, values);
            const orderData = {
                products,
                transactionId: transaction.id,
                amount: transaction.amount,
                address: data.address,
            };

            createOrder(userId, userToken, orderData);
            setData({
                ...data, success: true, loading: false,
            });
            emptyCart(() => {
                setUpdate();
            });
        } catch (error) {
            setData({
                ...data, error: error.message || error, loading: false,
            });
        }
    };
    const handleAddress = event => {
        setData({...data, address: event.target.value});
    };

    React.useEffect(() => {
        getToken(userId, userToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {data.success && (
                <div className='alert alert-success'>
                    Thank you. Payment was successful.
                </div>
            )}

            {data.error && (
                <div className='alert alert-danger'>
                    {data.error}
                </div>
            )}

            {data.loading && (
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            )}

            <div className='alert alert-primary'>
                <div className='mb-2'>
                    Total price: ${total()}
                </div>

                <span className='ml-5'>
                    {isAuth() ? (
                        <>
                            {data.token && products.length > 0 && (
                                <div onBlur={() => setData({...data, error: ''})}>
                                    <div className='form-group mb-3'>
                                        <label htmlFor='address' className='text-muted'>Address</label>
                                        <textarea
                                            name='address'
                                            id='address'
                                            className='form-control'
                                            value={data.address}
                                            placeholder='Type your delivery address here ...'
                                            onChange={handleAddress}
                                        ></textarea>
                                    </div>
                                    <DropIn
                                        options={{
                                            authorization: data.token,
                                            paypal: {flow: 'vault'},
                                        }}
                                        className='mb-5'
                                        onInstance={instance => {data.instance = instance;}}
                                    />
                                    <button className='btn btn-success mt-2' onClick={handleClick}>Pay</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link to='/signin'>
                            <button className='btn btn-primary'>Sign in to checkout</button>
                        </Link>

                    )}
                </span>
            </div>
        </>
    );
};

Checkout.propTypes = {
    products: PropTypes.array,
    setUpdate: PropTypes.func,
};

export default Checkout;
