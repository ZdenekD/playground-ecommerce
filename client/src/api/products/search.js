import queryString from 'query-string';
import API from '../../config';

const search = params => {
    const query = queryString.stringify(params);

    return fetch(`${API}/products/search?${query}`, {method: 'GET'})
        .then(response => response.json())
        .catch(error => console.log(error));
};

export default search;
