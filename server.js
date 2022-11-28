const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// load environment  vars

dotenv.config({path: './config/config.env'});

//Connect to Database
connectDB();

const app = express();

//Body Parser
app.use(express.json());

//Enable Cors
app.use(cors());

//Routes
app.use('/api/users', require('./routes/users'));

app.use('/api/stores', require('./routes/stores'));

app.use('/api/post', require('./routes/posts'));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to fatihin BikeOn application." });
  });

const PORT = process.env.PORT || 4652;

app.listen(PORT, () =>
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);