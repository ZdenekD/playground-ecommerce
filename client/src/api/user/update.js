import API from '../../config';

const update = (id, token, user) => fetch(`${API}/user/${id}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default update;
