import API from '../../config';

// eslint-disable-next-line consistent-return
const signOut = callback => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');

        callback();

        return fetch(`${API}/signout`, {method: 'GET'})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
};

export default signOut;
