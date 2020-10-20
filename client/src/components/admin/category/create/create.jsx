import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../../layout';
import {isAuth} from '../../../../api/user/auth';
import create from '../../../../api/admin/category/create';

const Create = () => {
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const {user, token} = isAuth();
    const handleCreate = async () => {
        try {
            await create(user._id, token, {name});

            setError('');
            setSuccess(true);
        } catch (err) {
            setError(err);
        }
    };
    const handleChange = event => {
        setError('');
        setName(event.target.value);
    };
    const handleSubmit = event => {
        event.preventDefault();

        setError('');
        setSuccess(false);
        handleCreate();
    };

    return (
        <Layout
            title='Add a new category'
            description={`Welcome ${user.name}! Ready to create a new category?`}
            className='container col-md-8 offset-md-2'
        >
            <nav aria-label='breadcrumb' className='mb-5'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/admin/dashboard'>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                        Create category
                    </li>
                </ol>
            </nav>

            {error && (
                <div className='alert alert-danger'>
                    Category <strong>{name}</strong> is should be unique.
                </div>
            )}

            {success && (
                <div className='alert alert-info'>
                    Category <strong>{name}</strong> is created.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name' className='text-muted'>Name</label>
                    <input
                        required
                        id='name'
                        type='text'
                        className='form-control'
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <button className='btn btn-outline-primary'>Create</button>
            </form>
        </Layout>
    );
};

export default Create;
