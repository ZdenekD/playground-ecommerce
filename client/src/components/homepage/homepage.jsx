import React from 'react';
import get from '../../api/products/get';
import Layout from '../layout';
import Product from '../product';
import Search from '../search';

const Homepage = () => {
    const [bySell, setBySell] = React.useState([]);
    const [byArrival, setByArrival] = React.useState([]);
    const [error, setError] = React.useState('');
    const getBySell = () => {
        get('sold').then(response => {
            if (response.error) {
                setError(response.error);
            } else {
                setBySell(response);
            }
        });
    };
    const getByArrival = () => {
        get('createdAt').then(response => {
            if (response.error) {
                setError(response.error);
            } else {
                setByArrival(response);
            }
        });
    };

    React.useEffect(() => {
        getBySell();
        getByArrival();
    }, []);

    return (
        <Layout
            title='Homepage'
            description='E-shop'
            className='container col-md-8 offset-md-2'
        >
            {error && (
                <div className='alert alert-danger'>
                    {error}
                </div>
            )}

            <Search />

            <h2 className="mb-4">New arrivals</h2>
            <div className="row">
                {byArrival.length > 0 && byArrival.map(product => (
                    <div key={product._id} className="col-4 mb-3">
                        <Product product={product} />
                    </div>
                ))}

            </div>

            <h2 className="mb-4">Best sellers</h2>
            <div className="row">
                {bySell.length > 0 && bySell.map(product => (
                    <div key={product._id} className="col-4 mb-3">
                        <Product product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Homepage;
