import mongoose from "mongoose";

const collection = 'chatHistorial'
const schema = new mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    timestamp: {
        type: String,
        require: true
    }
})

const chatModel = mongoose.model(collection, schema);

export default chatModel;