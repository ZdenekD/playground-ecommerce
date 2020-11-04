import API from '../../../config';

const update = (id, token, productId, product) => fetch(`${API}/product/${productId}/${id}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: product,
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default update;
