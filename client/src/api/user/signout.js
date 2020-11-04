import API from '../../config';

// eslint-disable-next-line consistent-return
const signOut = (callback = () => {}) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');

        callback();

        return fetch(`${API}/signout`, {method: 'GET'});
    }
};

export default signOut;
