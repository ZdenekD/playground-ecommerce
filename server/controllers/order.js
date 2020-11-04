import Order from '../models/order';
import handleError from '../helpers/error';

const create = (req, res) => {
    req.body.order.user = req.profile;

    const order = new Order(req.body.order);

    // eslint-disable-next-line consistent-return
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({error: handleError(req)});
        }

        res.json(data);
    });
};

const list = (req, res) => {
    Order.find()
        .populate('user')
        .sort('-created')
        // eslint-disable-next-line consistent-return
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({error: handleError(req)});
            }

            res.json(data);
        });
};

const statuses = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

const updateStatus = (req, res) => {
    Order.update({_id: req.body.orderId}, {$set: {status: req.body.status}}, (error, data) => {
        if (error) {
            return res.status(400).json({error: handleError(req)});
        }

        res.json(data);
    });
};

const orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        // eslint-disable-next-line consistent-return
        .exec((error, data) => {
            if (error || !data) {
                return res.status(400).json({error: handleError(req)});
            }

            req.order = data;

            next();
        });
};

export {
    create, list, statuses, updateStatus
};

export default orderById;
