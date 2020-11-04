import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../navigation';
import style from './layout.css';

const Layout = ({title = 'E-Commerce', description = '', className, children}) => (
    <>
        <Navigation />
        <header className={`jumbotron ${style.jumbotron}`}>
            <div className="container">
                <h2>{title}</h2>
                <p className='lead'>
                    {description}
                </p>
            </div>
        </header>
        <section className={`${className} mb-5`}>
            {children}
        </section>
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
