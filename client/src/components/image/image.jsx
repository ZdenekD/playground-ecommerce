import React from 'react';
import PropTypes from 'prop-types';
import API from '../../config';
import style from './image.css';

const Image = ({item, url}) => (
    <div className="product-image">
        <img src={`${API}/${url}/image/${item._id}`} alt={item.name} className={`mb-3 ${style.image}`} />
    </div>
);

Image.propTypes = {
    item: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
};

export default Image;
