const auth = (data, callback = () => {}) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', JSON.stringify(data));

        callback();
    }
};

const isAuth = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    if (localStorage.getItem('token')) {
        return JSON.parse(localStorage.getItem('token'));
    }

    return false;
};

export {auth, isAuth};
