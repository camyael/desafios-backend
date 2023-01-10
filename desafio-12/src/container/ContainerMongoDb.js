import mongoose from "mongoose";

class ContainerMongoDb {
    constructor(collection) {
        this.collection = collection
    }

    async getAll () {
        return this.collection.find()
    }

    async getById ( id ) {
        const result = await this.collection.findById(id)
        return result
    }

    async disconnect () {
        mongoose.connection.close()
    }
}

export default ContainerMongoDb;