import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;
const ItemSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
    },
    name: String,
    price: Number,
    count: Number,
}, {timestamps: true});
const Item = mongoose.model('Item', ItemSchema);

export {Item, ItemSchema};
