import React from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../layout';
import read from '../../api/user/read';
import update from '../../api/user/update';
import updateUser from '../../api/user/helpers/update';
import {isAuth} from '../../api/user/helpers/auth';

const Profile = () => {
    const initialState = {
        name: '',
        password: '',
        error: '',
        success: false,
    };
    const [data, setData] = React.useState(initialState);
    const {userId} = useParams();
    const {user, token} = isAuth();
    const initialize = async () => {
        try {
            const {name, email} = await read(userId, token);

            setData({
                ...data, name, email,
            });
        } catch (error) {
            setData({...data, error: error.message});
        }
    };
    const handleChange = event => {
        event.persist();

        const {name, value} = event.target;

        setData({
            ...data,
            [name]: value,
        });
    };
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const updatedData = await update(userId, token, {
                name: data.name, email: data.email, password: data.password,
            });

            updateUser(updatedData, () => {
                setData({
                    ...data, ...updatedData, success: true,
                });
            });
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
            title='User profile'
            description={`Hi ${user.name}!`}
            className='container col-md-8 offset-md-2'
        >
            {data.error && (
                <div className='alert alert-danger'>
                    {data.error}
                </div>
            )}

            {data.success && (
                <div className="alert alert-info">
                    Profile is successfuly updated.
                </div>
            )}

            <div className='card'>
                <h3 className='card-header'>Profile update</h3>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
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
                                name='email'
                                type='email'
                                className='form-control'
                                value={data.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password' className='text-muted'>Password</label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                className='form-control'
                                value={data.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='btn btn-outline-primary'>Update</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
