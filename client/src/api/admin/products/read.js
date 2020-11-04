import API from '../../../config';

const read = () => fetch(`${API}/products?limit=undefined`, {method: 'GET'})
    .then(response => response.json())
    .catch(error => console.log(error));

export default read;
