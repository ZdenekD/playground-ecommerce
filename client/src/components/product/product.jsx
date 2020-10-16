import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import moment from 'moment';
import Image from '../image';
import addItem from '../cart/addItem';
import updateItem from '../cart/updateItem';
import removeItem from '../cart/removeItem';

const Product = ({
    product,
    hasViewButton = true,
    hasCartButton = true,
    hasCartUpdate = false,
    hasCartRemove = false,
    setUpdate,
    update,
}) => {
    const [count, setCount] = React.useState(product.count);
    const [redirect, setRedirect] = React.useState(false);
    const handleClick = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };
    const handleChange = id => event => {
        const {value} = event.target;

        setUpdate(!update);
        setCount(value < 1 ? 1 : value);

        if (value >= 1) {
            updateItem(id, value);
        }
    };
    const handleRemove = id => {
        removeItem(id);
        setUpdate(!update);
    };

    return (
        <div className='card'>
            <div className='card-header'>
                {product.name}
            </div>
            <div className='card-body'>
                {redirect && (
                    <Redirect to='/cart' />
                )}

                <Image item={product} url='product' />

                <hr />

                {product.quantity && (
                    <>
                        {product.quantity > 0 ? (
                            <span className='badge badge-success badge-pill'>
                                In Stock  (qt: {product.quantity})
                            </span>
                        ) : (
                            <span className='badge badge-warning badge-pill'>
                                Out of Stock
                            </span>
                        )}
                    </>
                )}

                {product.createdAt && (
                    <>
                        <br/>
                        <small>
                            Added on {moment(product.createdAt).fromNow()}
                        </small>
                    </>
                )}

                <hr />

                <p className='lead mt-2'>
                    {product.description}
                </p>
                <p>
                    <strong>${product.price}</strong>
                </p>

                {product.category && (
                    <p>
                        Category: <strong>{product.category.name}</strong>
                    </p>
                )}

                {hasCartUpdate && (
                    <>
                        <div className='input-group mb-3'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>
                                    Adjust quantity
                                </span>
                            </div>
                            <input
                                type='number'
                                className='form-control'
                                value={count}
                                min='1'
                                onChange={handleChange(product._id)}
                            />

                        </div>
                    </>
                )}

                {hasViewButton && (
                    <Link to={`/product/${product._id}`}>
                        <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                            View product
                        </button>
                    </Link>
                )}

                {hasCartButton && (
                    <button className='btn btn-outline-warning mt-2 mb-2' onClick={handleClick}>
                        Add to cart
                    </button>
                )}

                {hasCartRemove && (
                    <button className="btn btn-danger" onClick={() => handleRemove(product._id)}>
                        Remove product
                    </button>
                )}
            </div>
        </div>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
    hasViewButton: PropTypes.bool,
    hasCartButton: PropTypes.bool,
    hasCartUpdate: PropTypes.bool,
    hasCartRemove: PropTypes.bool,
    setUpdate: PropTypes.func,
    update: PropTypes.bool,
};

export default Product;
