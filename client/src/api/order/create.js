import API from '../../config';

const create = (id, token, data) => fetch(`${API}/order/create/${id}`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({order: data}),
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default create;
