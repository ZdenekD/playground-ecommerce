import fs from 'fs';
import _ from 'lodash';
import formidable from 'formidable';
import handleError from '../helpers/error';
import Product from '../models/product';

const create = (req, res) => {
    const form = new formidable.IncomingForm();

    form.keepExtensions = true;
    // eslint-disable-next-line consistent-return
    form.parse(req, (error, fields, files) => {
        if (error) {
            return res.status(400).json({error: 'Image could not be uploaded'});
        }

        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping,
        } = fields;

        if (
            !name
            || !description
            || !price
            || !category
            || !quantity
            || !shipping
        ) {
            return res.status(400).json({error: 'All fields are required'});
        }

        const product = new Product(fields);

        if (files.image) {
            if (files.image.size > 1000000) {
                res.status(400).json({error: 'Image should be smaller than 1MB'});
            }

            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }

        // eslint-disable-next-line consistent-return
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({error: handleError(req)});
            }

            res.json(data);
        });
    });
};

const read = (req, res) => {
    req.product.image = undefined;

    return res.json(req.product);
};

const remove = (req, res) => {
    const {product} = req;

    product.remove(error => {
        if (error) {
            res.status(400).json({error: handleError(req)});
        }

        res.json({message: 'Product deleted successfully'});
    });
};

const update = (req, res) => {
    const form = new formidable.IncomingForm();

    form.keepExtensions = true;
    // eslint-disable-next-line consistent-return
    form.parse(req, (error, fields, files) => {
        if (error) {
            return res.status(400).json({error: 'Image could not be uploaded'});
        }

        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping,
        } = fields;

        if (
            !name
            || !description
            || !price
            || !category
            || !quantity
            || !shipping
        ) {
            return res.status(400).json({error: 'All fields are required'});
        }

        let {product} = req;

        product = _.extend(product, fields);

        if (files.image) {
            if (files.image.size > 1000000) {
                res.status(400).json({error: 'Image should be smaller than 1MB'});
            }

            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }

        // eslint-disable-next-line consistent-return
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({error: handleError(req)});
            }

            res.json(data);
        });
    });
};

// eslint-disable-next-line consistent-return
const productImage = (req, res, next) => {
    if (req.product.image.data) {
        res.set('Content-Type', req.product.image.contentType);

        return res.send(req.product.image.data);
    }

    next();
};

const list = (req, res) => {
    const {
        order = 'asc',
        sortBy = '_id',
        limit = 6,
    } = req.query;

    Product
        .find()
        .select('-image')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(parseInt(limit, 10))
        // eslint-disable-next-line consistent-return
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({error: 'Products not found'});
            }

            res.json(data);
        });
};

const listRelated = (req, res) => {
    const {limit = 6} = req.query;

    Product
        .find({
            _id: {$ne: req.product},
            category: req.product.category,
        })
        .select('-image')
        .limit(parseInt(limit, 10))
        .populate('category', '_id name')
        // eslint-disable-next-line consistent-return
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({error: 'Products not found'});
            }

            res.json(data);
        });
};

const listCategories = (req, res) => {
    Product
        // eslint-disable-next-line consistent-return
        .distinct('category', {}, (error, data) => {
            if (error) {
                return res.status(400).json({error: 'Products not found'});
            }

            res.json(data);
        });
};

const listBySearch = (req, res) => {
    const {
        order = 'desc',
        sortBy = '_id',
        limit = 100,
        skip,
        filters,
    } = req.body;
    const findArgs = {};

    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key].length > 0) {
                if (key === 'price') {
                    findArgs[key] = {
                        $gte: filters[key][0],
                        $lte: filters[key][1],
                    };
                } else {
                    findArgs[key] = filters[key];
                }
            }
        });
    }

    Product
        .find(findArgs)
        .select('-image')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(parseInt(skip, 10))
        .limit(parseInt(limit, 10))
        // eslint-disable-next-line consistent-return
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({error: 'Products not found'});
            }

            res.json({
                size: data.length,
                data,
            });
        });
};

const listSearch = (req, res) => {
    const query = {};

    if (req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'};

        if (req.query.category && req.query.category !== 'all') {
            query.category = req.query.category;
        }

        Product
            // eslint-disable-next-line consistent-return
            .find(query, (error, data) => {
                if (error) {
                    return res.status(400).json({error: handleError(req)});
                }

                res.json(data);
            })
            .select('-image');
    }
};

const productById = (req, res, next, id) => {
    Product
        .findById(id)
        .populate('category')
        .exec((error, data) => {
            if (error || !data) {
                res.status(400).json({error: 'Product not found'});
            }

            req.product = data;

            next();
        });
};

const updateQuantity = (req, res, next) => {
    const options = req.body.order.products.map(product => ({
        updateOne: {
            filter: {_id: product._id},
            update: {$inc: {quantity: -product.count, sold: +product.count}},
        },
    }));

    // eslint-disable-next-line consistent-return
    Product.bulkWrite(options, {}, error => {
        if (error) {
            return res.status(400).json({error: 'Could not update product'});
        }

        next();
    });
};

export {
    create,
    read,
    remove,
    update,
    list,
    productImage,
    listRelated,
    listCategories,
    listBySearch,
    listSearch,
    productById,
    updateQuantity
};
