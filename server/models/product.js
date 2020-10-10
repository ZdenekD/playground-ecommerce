import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2560,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 12,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    quantity: {type: Number},
    image: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,
        required: false,
    },
}, {timestamps: true});

export default mongoose.model('Product', ProductSchema);
