import API from '../../config';

const signUp = user => fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default signUp;
