import API from '../../../config';

const list = (id, token) => fetch(`${API}/user/orders/${id}`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default list;
