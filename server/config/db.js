const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MODE === 'prod' ? process.env.MONGODB_PROD_URL : process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB Server");
})

db.on('error', (err) => {
    console.log("MongoDB connection error: ", err);
})
db.on('disconnected', () => {
    console.log("MongoDB disconnected");
})