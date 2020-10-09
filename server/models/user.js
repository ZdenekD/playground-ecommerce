/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import crypto from 'crypto';
import {v4 as uuid} from 'uuid';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32,
    },
    hashed: {
        type: String,
        required: true,
    },
    salt: {type: String},
    role: {
        type: Number,
        default: 0,
    },
    about: {
        type: String,
        trim: true,
    },
    history: {
        type: Array,
        default: [],
    },
}, {timestamps: true});

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuid();
        this.hashed = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    isAuthenticated(password) {
        return this.encryptPassword(password) === this.hashed;
    },
    encryptPassword(password) {
        if (!password) {
            return '';
        }

        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return '';
        }
    },
};

export default mongoose.model('User', UserSchema);
