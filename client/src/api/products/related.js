import API from '../../config';

const related = id => fetch(`${API}/products/related/${id}`, {method: 'GET'})
    .then(response => response.json())
    .catch(error => console.log(error));

export default related;
