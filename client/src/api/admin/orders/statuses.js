import API from '../../../config';

const statuses = (id, token) => fetch(`${API}/order/statuses/${id}`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default statuses;
