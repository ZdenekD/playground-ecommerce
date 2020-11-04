import {body} from 'express-validator';

export default [
    body('name', 'Name is required').notEmpty(),
    body('email', 'E-mail is not valid').isEmail().isLength({min: 4, max: 32}),
    body('password', 'Password is required').notEmpty(),
    body('password', 'Password must contain at least 6 characters').isLength({min: 6}),
    body('password', 'Password must contain a number').matches(/\d/),
];
