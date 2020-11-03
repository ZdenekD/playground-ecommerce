import API from '../../../config';

const updateStatus = (id, token, orderId, status) => fetch(`${API}/order/${orderId}/status/${id}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        status,
        orderId,
    }),
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default updateStatus;
