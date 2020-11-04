import handleError from '../helpers/error';
import User from '../models/user';
import Order from '../models/order';

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
    User.findById(id).exec((error, data) => {
        if (error || !data) {
            return res.status(400).json({error: 'User not found'});
        }

        req.profile = data;

        next();
    });
};

const history = (req, res, next) => {
    const order = [];

    req.body.order.products.forEach(product => {
        order.push({
            ...product,
            transactionId: req.body.order.transactionId,
            amount: req.body.order.amount,
        });
    });

    // eslint-disable-next-line consistent-return
    User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: order}}, {new: true}, error => {
        if (error) {
            return res.status(400).json({error: 'Could not update user purchase history.'});
        }

        next();
    });
};

const orders = (req, res) => {
    Order.find({user: req.profile._id})
        .populate('user', '_id name')
        .sort('-created')
        // eslint-disable-next-line consistent-return
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({error: handleError(req)});
            }

            res.json(data);
        });
};

export {
    read, update, history, orders
};

export default userById;
