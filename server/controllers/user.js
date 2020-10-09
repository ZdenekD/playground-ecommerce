import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';
import User from '../models/user';

const signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array().map(error => error.msg)[0]});
    }

    const user = new User(req.body);

    user.save((error, item) => {
        if (error) {
            return res.status(400).json({error});
        }

        return res.json({
            user: {
                name: item.name,
                email: item.email,

            },
        });
    });
};

const signin = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}, (error, user) => {
        if (error || !user) {
            return res.status(400).json({error: 'User with that e-mail does not exists. Please signup'});
        }

        if (!user.isAuthenticated(password)) {
            return res.status(401).json({error: 'E-mail and password do not match'});
        }

        const token = jwt.sign({_id: user._id}, process.env.TOKEN);

        res.cookie('token', token, {expire: new Date() + 600});

        return res.json({
            token,
            user,
        });
    });
};

const signout = (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Signout successfull'});
};

export {
    signup, signin, signout
};
