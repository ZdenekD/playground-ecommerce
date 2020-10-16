import React from 'react';
import Layout from '../layout';
import Product from '../product';
import Categories from '../filter/categories';
import Prices from '../filter/prices';
import get from '../../api/category/get';
import filterProducts from '../../api/products/filter';
import prices from '../../data/prices';

const Shop = () => {
    const initialState = {
        filters: {
            category: [],
            price: [],
        },
    };
    const [categories, setCategories] = React.useState([]);
    const [filter, setFilter] = React.useState(initialState);
    const [result, setResult] = React.useState([]);
    const [limit, setLimit] = React.useState(6);
    const [skip, setSkip] = React.useState(0);
    const [size, setSize] = React.useState(0);
    const [error, setError] = React.useState('');
    const initialize = () => {
        get().then(response => {
            if (response.error) {
                setError(response.error);
            } else {
                setCategories(response);
            }
        });
    };
    const filterResults = filters => {
        filterProducts(skip, limit, filters)
            .then(response => {
                if (response.error) {
                    setError(response.error);
                } else {
                    setResult(response.data);
                    setSize(response.size);
                    setSkip(0);
                }
            });
    };
    const handlePrice = value => {
        const data = prices;
        let array = [];

        data.forEach(price => {
            if (price._id === parseInt(value, 10)) {
                array = price.array;
            }
        });

        return array;
    };
    const handleFilters = (filters, filterBy) => {
        const updated = filter;

        updated.filters[filterBy] = filters;

        if (filterBy === 'price') {
            const price = handlePrice(filters);

            updated.filters[filterBy] = price;
        }

        filterResults(filter.filters);
        setFilter(updated);
    };
    const handleMore = () => {
        const toSkip = skip + limit;

        filterProducts(toSkip, limit, filter.filters)
            .then(response => {
                if (response.error) {
                    setError(response.error);
                } else {
                    setResult([...result, ...response.data]);
                    setSize(response.size);
                    setSkip(toSkip);
                }
            });
    };

    React.useEffect(() => {
        initialize();
        filterResults(filter.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            title='E-shop'
            description='Search and find books of your choice'
            className='container'
        >
            {error && (
                <div className='alert alert-danger'>
                    {error}
                </div>
            )}

            <div className='row'>
                <aside className='col-3'>
                    <div className='card mb-4'>
                        <h4 className='card-header'>Filter by categories</h4>
                        <Categories categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </div>
                    <div className='card'>
                        <h4 className='card-header'>Filter by prices</h4>
                        <Prices prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>
                </aside>
                <div className='col-8'>
                    <h2 className='mb-4'>Products</h2>
                    <div className='row'>
                        {result.length > 0 && (
                            result.map(product => <Product key={product._id} product={product} />)
                        )}
                    </div>
                    {size > 0 && size >= limit && (
                        <>
                            <hr />
                            <button className='btn btn-warning mb-5' onClick={handleMore}>Load more</button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Shop;