import API from '../../../config';

const create = (id, token, product) => fetch(`${API}/product/create/${id}`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: product,
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default create;
