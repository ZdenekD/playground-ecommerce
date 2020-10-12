import React from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../../layout';
import signIn from '../../../api/user/signin';
import {auth} from '../../../api/user/auth';

const SignIn = () => {
    const initialState = {
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectTo: false,
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
    const handleClick = event => {
        event.preventDefault();

        const {email, password} = data;

        setData({
            ...data, error: '', loading: true,
        });
        signIn({
            email,
            password,
        })
            .then(response => {
                if (response.error) {
                    setData({
                        ...data, error: response.error, loading: false,
                    });
                } else {
                    auth(response, () => {
                        setData({
                            ...initialState, loading: false, redirectTo: true,
                        });
                    });
                }
            });
    };

    return (
        <Layout
            title='SignIn'
            description='SignIn to e-shop'
            className='container col-md-8 offset-md-2'
        >
            {data.error && (
                <div className='alert alert-danger'>
                    {data.error}
                </div>
            )}

            {data.loading && (
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            )}

            {data.redirectTo && (
                <Redirect to='/' />
            )}

            <form>
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

export default SignIn;
