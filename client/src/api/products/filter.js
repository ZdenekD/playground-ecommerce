import API from '../../config';

const filter = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters,
    };

    return fetch(`${API}/products/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .catch(error => console.log(error));
};

export default filter;
