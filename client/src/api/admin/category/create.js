import API from '../../../config';

const create = (id, token, category) => fetch(`${API}/category/create/${id}`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default create;
