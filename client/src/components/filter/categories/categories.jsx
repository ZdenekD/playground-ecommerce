import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({categories, handleFilters}) => {
    const [checked, setChecked] = React.useState([]);
    const handleChange = category => () => {
        const current = checked.indexOf(category);
        const checkedCategories = [...checked];

        if (current < 0) {
            checkedCategories.push(category);
        } else {
            checkedCategories.splice(current, 1);
        }

        handleFilters(checkedCategories);
        setChecked(checkedCategories);
    };

    return (
        <ul className='list-group'>
            {categories.length > 0 && categories.map(category => (
                <li key={category._id} className='list-group-item'>
                    <input
                        id={category._id}
                        type='checkbox'
                        className='form-check-input'
                        value={checked.indexOf(category._id < 0)}
                        onChange={handleChange(category._id)}
                    />
                    <label htmlFor={category._id} className='form-check-label'>{category.name}</label>
                </li>
            ))}
        </ul>
    );
};

Categories.propTypes = {
    categories: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
};

export default Categories;
