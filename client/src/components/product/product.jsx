import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Image from '../image';

const Product = ({product, hasViewButton = true}) => (
    <div className='card'>
        <div className='card-header'>
            {product.name}
        </div>
        <div className='card-body'>
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
                <small className='float-right'>
                    Added on {moment(product.createdAt).fromNow()}
                </small>
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

            {hasViewButton && (
                <Link to={`/product/${product._id}`}>
                    <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View product
                    </button>
                </Link>
            )}

            <Link to='/'>
                <button className='btn btn-outline-warning mt-2 mb-2'>
                    Add to cart
                </button>
            </Link>
        </div>
    </div>
);

Product.propTypes = {
    product: PropTypes.object.isRequired,
    hasViewButton: PropTypes.bool,
};

export default Product;
