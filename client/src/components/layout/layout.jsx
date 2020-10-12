import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';

const Layout = ({title = 'E-Commerce', description = '', className, children}) => (
    <>
        <Menu />
        <div className='jumbotron'>
            <h2>{title}</h2>
            <p className='lead'>
                {description}
            </p>
        </div>
        <div className={className}>
            {children}
        </div>
    </>
);

Layout.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.node,
    ]),
};

export default Layout;
