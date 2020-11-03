import handleError from '../helpers/error';
import Category from '../models/category';

const create = (req, res) => {
    const category = new Category(req.body);

    category.save((error, data) => {
        if (error) {
            res.status(400).json({error: handleError(req)});
        }

        res.json({data});
    });
};

const read = (req, res) => res.json(req.category);

const remove = (req, res) => {
    const {category} = req;

    // eslint-disable-next-line consistent-return
    category.remove(error => {
        if (error) {
            return res.status(400).json({error: handleError(req)});
        }

        res.json({message: 'Category deleted successfully'});
    });
};

const update = (req, res) => {
    const {category} = req;

    category.name = req.body.name;
    // eslint-disable-next-line consistent-return
    category.save((error, data) => {
        if (error) {
            return res.status(400).json({error: handleError(req)});
        }

        res.json(data);
    });
};

const list = (req, res) => {
    // eslint-disable-next-line consistent-return
    Category.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({error: handleError(req)});
        }

        res.json(data);
    });
};

const categoryById = (req, res, next, id) => {
    // eslint-disable-next-line consistent-return
    Category.findById(id).exec((error, data) => {
        if (error || !data) {
            return res.status(400).json({error: 'Category does not exists'});
        }

        req.category = data;

        next();
    });
};

export {
    create, read, remove, update, list, categoryById
};
