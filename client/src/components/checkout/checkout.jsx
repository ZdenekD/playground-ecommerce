import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import {isAuth} from '../../api/user/auth';
import get from '../../api/payment/token';
import process from '../../api/payment/process';

const Checkout = ({products}) => {
    const initialState = {
        token: null,
        instance: {},
        address: '',
        success: false,
        error: '',
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
        try {
            const {nonce} = await data.instance.requestPaymentMethod();
            const values = {
                paymentMethodNonce: nonce,
                amount: total(),
            };

            const response = await process(userId, userToken, values);

            setData({...data, success: response.success});
        } catch (error) {
            setData({...data, error: error.message || error});
        }
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

            <div className='alert alert-primary'>
                <div className="mb-2">
                    Total price: ${total()}
                </div>

                <span className='ml-5'>
                    {isAuth() ? (
                        <>
                            {data.token && products.length > 0 && (
                                <div onBlur={() => setData({...data, error: ''})}>
                                    <DropIn
                                        options={{authorization: data.token}}
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

Checkout.propTypes = {products: PropTypes.array};

export default Checkout;
