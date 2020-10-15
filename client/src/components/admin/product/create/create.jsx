import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../../layout';
import {isAuth} from '../../../../api/user/auth';
import create from '../../../../api/admin/product/create';
import get from '../../../../api/admin/category/get';

const Create = () => {
    const initialState = {
        name: '',
        description: '',
        price: '',
        category: '',
        categories: [],
        shipping: '',
        quantity: '',
        image: '',
        formData: '',
        loading: false,
        error: '',
        success: false,
        createdProduct: '',
        redirectTo: false,
    };
    const [data, setData] = React.useState(initialState);
    const {user, token} = isAuth();
    const handleChange = event => {
        event.persist();

        const {name} = event.target;
        const value = name === 'image' ? event.target.files[0] : event.target.value;

        data.formData.set(name, value);

        setData({
            ...data,
            [name]: value,
        });
    };
    const handleSubmit = event => {
        event.preventDefault();

        setData({
            ...data, error: '', loading: true,
        });
        create(user._id, token, data.formData)
            .then(response => {
                if (response.error) {
                    setData({...data, error: response.error});
                } else {
                    setData({
                        ...initialState, loading: false, success: true, createdProduct: response.name,
                    });
                }
            });
    };
    const initialize = () => {
        get().then(response => {
            if (response.error) {
                setData({...data, error: response.error});
            } else {
                setData({
                    ...data, categories: response, formData: new FormData(),
                });
            }
        });
    };

    React.useEffect(() => {
        initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            title='Add a new product'
            description={`Welcome ${user.name}! Ready to create a new product?`}
            className='container col-md-8 offset-md-2'
        >
            <nav aria-label='breadcrumb' className='mb-5'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/admin/dashboard'>Dashboard</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                        Create product
                    </li>
                </ol>
            </nav>

            {data.error && (
                <div className='alert alert-danger'>
                    {data.error}
                </div>
            )}

            {data.success && (
                <div className="alert alert-info">
                    New product <strong>{data.createdProduct}</strong> is created.
                </div>
            )}

            {data.loading && (
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='image' className='btn btn-secondary'>
                        <input
                            type='file'
                            name='image'
                            accept='image/*'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor='name' className='text-muted'>Name</label>
                    <input
                        required
                        id='name'
                        type='text'
                        name='name'
                        className='form-control'
                        value={data.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='description' className='text-muted'>Description</label>
                    <textarea
                        required
                        className='form-control'
                        id='description'
                        name='description'
                        value={data.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className='form-group'>
                    <label htmlFor='price' className='text-muted'>Price</label>
                    <input
                        required
                        id='price'
                        type='text'
                        name='price'
                        className='form-control'
                        value={data.price}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='category' className='text-muted'>Category</label>
                    <select
                        required
                        id='category'
                        className='form-control'
                        name='category'
                        onBlur={handleChange}
                    >
                        <option defaultValue=''>Please choose</option>
                        {data.categories && data.categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='quantity' className='text-muted'>Quantity</label>
                    <input
                        id='quantity'
                        type='text'
                        name='quantity'
                        className='form-control'
                        value={data.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='shipping' className='text-muted'>Shipping</label>
                    <select
                        required
                        id='shipping'
                        className='form-control'
                        name='shipping'
                        onBlur={handleChange}
                    >
                        <option defaultValue=''>Please choose</option>
                        <option value='0'>No</option>
                        <option value='1'>Yes</option>
                    </select>
                </div>

                <button className='btn btn-outline-primary'>Create</button>
            </form>
        </Layout>
    );
};

export default Create;
