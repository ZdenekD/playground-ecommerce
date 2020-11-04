import API from '../../config';

const signIn = user => fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default signIn;
