const updateItem = (id, count) => {
    let cart = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        // eslint-disable-next-line array-callback-return
        cart.map((product, i) => {
            if (product._id === id) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

export default updateItem;
