import API from '../../config';

const read = () => fetch(`${API}/categories`, {method: 'GET'})
    .then(response => response.json())
    .catch(error => console.log(error));

export default read;
