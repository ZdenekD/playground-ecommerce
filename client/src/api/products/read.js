import API from '../../config';

const read = sortBy => fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {method: 'GET'})
    .then(response => response.json())
    .catch(error => console.log(error));

export default read;
