import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';
import handleError from '../helpers/error';
import User from '../models/user';

dotenv.config();

// eslint-disable-next-line consistent-return
const signup = (req, res) => {
    if (handleError(req)) {
        return res.status(400).json({error: handleError(req)});
    }

    const user = new User(req.body);

    user.save((error, data) => {
        if (error) {
            return res.status(400).json({error});
        }

        return res.json({
            user: {
                name: data.name,
                email: data.email,

            },
        });
    });
};

const signin = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}, (error, data) => {
        if (error || !data) {
            return res.status(400).json({error: 'User with that e-mail does not exists. Please signup'});
        }

        if (!data.isAuthenticated(password)) {
            return res.status(401).json({error: 'E-mail and password do not match'});
        }

        const token = jwt.sign({_id: data._id}, process.env.SECRET);

        res.cookie('token', token, {expire: new Date() + 9999});

        return res.json({
            token,
            user: {
                name: data.name,
                email: data.email,
                role: data.role,
            },
        });
    });
};

const requireSignin = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth',
});

const signout = (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Signout successfull'});
};

// eslint-disable-next-line consistent-return
const isAuth = (req, res, next) => {
    const user = req.profile && req.auth && `${req.profile._id}` === req.auth._id;

    if (!user) {
        return res.status(403).json({error: 'Access denied'});
    }

    next();
};

// eslint-disable-next-line consistent-return
const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({error: 'Admin resource! Access denied'});
    }

    next();
};

export {
    signup, signin, signout, requireSignin, isAuth, isAdmin
};
