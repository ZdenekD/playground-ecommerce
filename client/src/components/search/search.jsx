import React from 'react';
import Product from '../product';
import get from '../../api/category/get';
import search from '../../api/products/search';

const Search = () => {
    const initialState = {
        categories: [],
        category: '',
        search: '',
        result: [],
        isSearched: false,
    };
    const [data, setData] = React.useState(initialState);
    const [error, setError] = React.useState('');
    const initialize = () => {
        get()
            .then(response => {
                if (response.error) {
                    setError(response.error);
                } else {
                    setData({...data, categories: response});
                }
            });
    };
    const handleSearch = () => {
        if (data.search) {
            search({
                search: data.search || undefined,
                category: data.category,
            })
                .then(response => {
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setData({
                            ...data,
                            result: response,
                            isSearched: true,
                        });
                    }
                });
        }
    };
    const handleSubmit = event => {
        event.preventDefault();

        handleSearch();
    };
    const handleChange = event => {
        const {name, value} = event.target;

        setData({
            ...data,
            [name]: value,
            isSearched: false,
        });
    };

    React.useEffect(() => {
        initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(data);

    return (
        <>
            {error && (
                <div className='alert alert-danger'>
                    {error}
                </div>
            )}

            <div className="mb-4">
                <div className='row'>
                    <div className='col-12'>
                        <form onSubmit={handleSubmit}>
                            <span className='input-group-text'>
                                <span className='input-group'>
                                    <span className='input-group-prepend'>
                                        <select
                                            className='btn mr-2'
                                            name='category'
                                            onBlur={handleChange}
                                        >
                                            <option value='all'>All</option>
                                            {data.categories && data.categories.map(category => (
                                                <option key={category._id} value={category._id}>{category.name}</option>
                                            ))}

                                        </select>
                                    </span>
                                    <input
                                        id='search'
                                        type='search'
                                        name='search'
                                        className='form-control'
                                        placeholder='Search by name'
                                        onChange={handleChange}
                                    />
                                </span>
                                <span className='btn input-group-append'>
                                    <button className='input-group-text'>Search</button>
                                </span>
                            </span>
                        </form>
                    </div>
                </div>
            </div>

            {data.isSearched && (
                <>
                    {data.result.length > 0 ? (
                        <div className='alert alert-info'>
                            Found {data.result.length} products
                        </div>
                    ) : (
                        <div className='alert alert-info'>
                            No products found
                        </div>
                    )}
                    <div className="row">
                        {data.result.length > 0 && data.result.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Search;