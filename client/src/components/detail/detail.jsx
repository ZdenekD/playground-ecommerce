import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';
import Product from '../product';
import detail from '../../api/products/detail';
import relatedProduct from '../../api/products/related';

const Detail = props => {
    const [product, setProduct] = React.useState({});
    const [related, setRelated] = React.useState([]);
    const [error, setError] = React.useState('');
    const getRelated = id => {
        relatedProduct(id)
            .then(response => {
                if (response.error) {
                    setError(response.error);
                } else {
                    setRelated(response);
                }
            });
    };
    const getProduct = id => {
        detail(id)
            .then(response => {
                if (response.error) {
                    setError(response.error);
                } else {
                    setProduct(response);
                    getRelated(response._id);
                }
            });
    };

    React.useEffect(() => {
        // eslint-disable-next-line react/prop-types
        const {productId} = props.match.params;

        getProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            className='container'
        >
            {error && (
                <div className='alert alert-danger'>
                    {error}
                </div>
            )}

            {product && product.description && (
                <div className='row'>
                    <div className='col-6 mb-4'>
                        <Product product={product} hasViewButton={false} />
                    </div>
                </div>
            )}

            {related.length > 0 && (
                <div className='row'>
                    {related.map(item => (
                        <div key={item._id} className='col-4'>
                            <Product product={item} />
                        </div>
                    ))}
                </div>
            )}

        </Layout>
    );
};

Detail.propTypes = {props: PropTypes.object};

export default Detail;
