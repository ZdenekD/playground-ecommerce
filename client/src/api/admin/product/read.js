import API from '../../../config';

const get = id => fetch(`${API}/product/${id}`, {method: 'GET'})
    .then(response => response.json())
    .catch(error => console.log(error));

export default get;
