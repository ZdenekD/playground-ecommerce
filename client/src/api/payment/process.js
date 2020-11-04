import API from '../../config';

const process = (id, token, data) => fetch(`${API}/payment/${id}`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
})
    .then(response => response.json())
    .catch(error => console.log(error));

export default process;
