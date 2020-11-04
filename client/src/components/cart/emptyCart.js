const emptyCart = (callback = () => {}) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');

        callback();
    }
};

export default emptyCart;
