import User from '../models/user';

const userById = (req, res, next, id) => {
    // eslint-disable-next-line consistent-return
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({error: 'User not found'});
        }

        req.profile = user;

        next();
    });
};

export default userById;
