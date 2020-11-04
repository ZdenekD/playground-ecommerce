const removeItem = id => {
    let cart = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        // eslint-disable-next-line array-callback-return
        cart.map((product, i) => {
            if (product._id === id) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return cart;
};

export default removeItem;
