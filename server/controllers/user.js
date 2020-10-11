import User from '../models/user';

const read = (req, res) => {
    req.profile.hashed = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
};

const update = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true},
        // eslint-disable-next-line consistent-return
        (error, data) => {
            if (error) {
                return res.status(400).json({error: 'You are not authorized to perform this action'});
            }

            // eslint-disable-next-line no-param-reassign
            data.hashed = undefined;
            // eslint-disable-next-line no-param-reassign
            data.salt = undefined;

            res.json(data);
        }
    );
};

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

export {read, update};

export default userById;
