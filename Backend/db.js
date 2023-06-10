const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017";

// const connectToMongo = () => {
//     mongoose.set('strictQuery', false);
//     mongoose.connect(mongoURI, () => {
//         console.log("Connected to Mongo successfully..");
//     })
// }

const server = '127.0.0.1:27017';
const database = 'test';
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