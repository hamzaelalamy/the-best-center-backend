require('./config/database');
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const path = require('path');
const adminroutes = require("./routes/adminroutes");
const app = express();

const port = process.env.PORT || 3500;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// app.use(express.static('public'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Testing!');
});

app.use("/api", adminroutes);

app.get("*", (req, res) => {
    res.status(404).json({
        message: "Page not found"
    });
});

app.listen(port, () => {
    console.log(`SERVER IS WORKING ON ${port}`);
});
