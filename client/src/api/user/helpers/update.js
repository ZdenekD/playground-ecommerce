const update = (user, callback = () => {}) => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('token')) {
            const auth = JSON.parse(localStorage.getItem('token'));

            auth.user = user;

            localStorage.setItem('token', JSON.stringify(auth));

            callback();
        }
    }
};

export default update;
