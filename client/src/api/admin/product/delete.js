import API from '../../../config';

const remove = (id, token, productId) => fetch(`${API}/product/${productId}/${id}`, {
    method: 'DELETE',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default remove;
