import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {isAuth} from '../../api/user/auth';

const Checkout = ({products}) => {
    const total = () => products.reduce((current, next) => current + next.count * next.price, 0);

    return (
        <>
            <div className='alert alert-primary'>
                Total price: ${total()}

                <span className="ml-5">
                    {isAuth() ? (
                        <button className="btn btn-success">
                            Checkout
                        </button>
                    ) : (
                        <Link to='/signin'>
                            <button className="btn btn-primary">Sign in to checkout</button>
                        </Link>

                    )}
                </span>
            </div>
        </>
    );
};

Checkout.propTypes = {products: PropTypes.array};

export default Checkout;
