const mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'CloudNotebook';
const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("Connected to Mongo successfully..");

    } catch (err) {
        console.log("Connection failed..",err);
    }
};

module.exports = connectToMongo;