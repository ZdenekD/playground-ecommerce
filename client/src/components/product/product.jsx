import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Image from '../image';

const Product = ({product}) => (
    <div className="col-4 mb-3">
        <div className="card">
            <div className="card-header">
                {product.name}
            </div>
            <div className="card-body">
                <Image item={product} url="product" />
                <p>
                    {product.description}
                </p>
                <p>
                    <strong>${product.price}</strong>
                </p>
                <Link to='/'>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View product
                    </button>
                </Link>
                <Link to='/'>
                    <button className="btn btn-outline-warning mt-2 mb-2">
                        Add to cart
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

Product.propTypes = {product: PropTypes.object.isRequired};

export default Product;
