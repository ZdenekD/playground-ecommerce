import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../layout';
import signUp from '../../../api/user/signup';

const SignUp = () => {
    const initialState = {
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    };
    const [data, setData] = React.useState(initialState);
    const handleChange = event => {
        event.persist();

        const {name, value} = event.target;

        setData({
            ...data,
            [name]: value,
        });
    };
    const handleClick = async event => {
        event.preventDefault();

        const {name, email, password} = data;

        setData({...data, error: ''});

        try {
            await signUp({
                name, email, password,
            });

            setData({...initialState, success: true});
        } catch (error) {
            setData({
                ...data, error, success: false,
            });
        }
    };

    return (
        <Layout
            title='SignUp'
            description='SignUp to e-shop'
            className='container col-md-8 offset-md-2'
        >
            {data.error && (
                <div className="alert alert-danger">
                    {data.error}
                </div>
            )}

            {data.success && (
                <div className="alert alert-info">
                    New account is created. <Link to='/signin'>Please signin</Link>.
                </div>
            )}

            <form>
                <div className='form-group'>
                    <label htmlFor='name' className='text-muted'>Name</label>
                    <input
                        id='name'
                        type='text'
                        name='name'
                        className='form-control'
                        value={data.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email' className='text-muted'>E-mail</label>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        className='form-control'
                        value={data.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password' className='text-muted'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        className='form-control'
                        value={data.password}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className='btn btn-primary'
                    onClick={handleClick}
                >Submit</button>
            </form>
        </Layout>
    );
};

export default SignUp;
