import mongoose from "mongoose";

const collection = 'Products'
const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    timestamp: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        default: 1
    }
})

const productsModel = mongoose.model(collection, schema);

export default productsModel;