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

        const {name, description, price, category, quantity, shipping} = fields;

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

        const {name, description, price, category, quantity, shipping} = fields;

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

const productById = (req, res, next, id) => {
    Product.findById(id).exec((error, product) => {
        if (error || !product) {
            res.status(400).json({error: 'Product not found'});
        }

        req.product = product;

        next();
    });
};

export {
    create, read, remove, update, productById
};
