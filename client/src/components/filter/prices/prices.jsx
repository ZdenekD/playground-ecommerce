import React from 'react';
import PropTypes from 'prop-types';

const Prices = ({prices, handleFilters}) => {
    const [value, setValue] = React.useState(0);
    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return (
        <ul className='list-group'>
            {prices.length > 0 && prices.map(price => (
                <li key={price._id} className='list-group-item'>
                    <input
                        id={price._id}
                        type='radio'
                        name='prices'
                        className='form-check-input'
                        value={`${price._id}`}
                        onChange={handleChange}
                    />
                    <label htmlFor={price._id} className='form-check-label'>{price.name}</label>
                </li>
            ))}
        </ul>
    );
};

Prices.propTypes = {
    prices: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
};

export default Prices;
