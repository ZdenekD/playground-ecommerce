import mongoose from 'mongoose';
import {ItemSchema} from './item';

const {ObjectId} = mongoose.Schema;
const OrderSchema = new mongoose.Schema({
    products: [ItemSchema],
    transactionId: {},
    amount: {type: Number},
    address: String,
    status: {
        type: String,
        default: 'Not processed',
        enum: [
            'Not processed',
            'Processing',
            'Shipped',
            'Delivered',
            'Canceled',
        ],
        updated: Date,
        user: {type: ObjectId, ref: 'User'},
    },
}, {timestamps: true});

export default mongoose.model('Order', OrderSchema);
