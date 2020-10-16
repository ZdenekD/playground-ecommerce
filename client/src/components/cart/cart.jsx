import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../layout';
import Product from '../product';
import Checkout from '../checkout';
import getItems from './getItems';

const Cart = () => {
    const [products, setProducts] = React.useState([]);
    const [update, setUpdate] = React.useState(false);

    React.useEffect(() => {
        setProducts(getItems());
    }, [update]);

    return (
        <Layout
            title='Shopping cart'
            description='Manage your cart items.'
            className='container col-md-8 offset-md-2'
        >
            {products.length > 0 ? (
                <>
                    <div className="row">
                        <div className="col-12">
                            <div className='alert alert-primary'>
                                Your cart contains {products.length} products
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <Checkout products={products} />
                        </div>
                    </div>

                    <div className="row">
                        {products.map(product => (
                            <div key={product._id} className="col-4 mb-3">
                                <Product
                                    product={product}
                                    hasCartButton={false}
                                    hasCartUpdate={true}
                                    hasCartRemove={true}
                                    setUpdate={setUpdate}
                                    update={update}
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className='alert alert-warning'>
                    Your cart is empty<br />
                    <Link to='/shop'>Continue shopping</Link>
                </div>
            )}

        </Layout>
    );
};

export default Cart;
