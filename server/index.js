const express = require('express');
const app = express();
const db = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/authRoute');

const PORT = process.env.PORT || 8000;

const origin = process.env.MODE === 'prod' ? process.env.ORIGIN_PROD : process.env.ORIGIN_DEV
const corsOptions = {
    origin: origin,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', authRouter);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})