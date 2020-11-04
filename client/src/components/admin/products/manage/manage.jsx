import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../../layout';
import {isAuth} from '../../../../api/user/helpers/auth';
import read from '../../../../api/admin/products/read';
import remove from '../../../../api/admin/product/delete';

const Manage = () => {
    const initialState = {
        products: [],
        error: '',
    };
    const [data, setData] = React.useState(initialState);
    const {user, token} = isAuth();
    const initialize = async () => {
        try {
            setData({products: await read()});
        } catch (error) {
            setData({...data, error});
        }
    };
    const handleClick = async id => {
        try {
            await remove(user._id, token, id);
            setData({products: await read()});
        } catch (error) {
            setData({...data, error});
        }
    };

    React.useEffect(() => {
        initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            title='Edit products'
            description='Perform CRUD on products'
            className='container col-md-8 offset-md-2'
        >
            <nav aria-label='breadcrumb' className='mb-5'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/admin/dashboard'>Dashboard</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                        Manage products
                    </li>
                </ol>
            </nav>

            {data.error && (
                <div className='alert alert-danger'>
                    {data.error}
                </div>
            )}

            <div className='alert alert-info'>
                Total {data.products.length} products
            </div>
            <ul className='list-group'>
                {data.products.length > 0 && data.products.map(product => (
                    <li key={product._id} className='list-group-item'>
                        <div className='card'>
                            <div className='card-header'>
                                <strong>{product.name}</strong>
                            </div>
                            <div className='card-body'>
                                <Link to={`/admin/product/update/${product._id}`}>
                                    <button className='btn btn-primary'>
                                        Update
                                    </button>
                                </Link>
                                <button className='btn btn-danger ml-3' onClick={() => handleClick(product._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </Layout>
    );
};

export default Manage;
