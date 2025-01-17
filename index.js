require('./config/database');
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3500;

// Middleware setup
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
    res.send('Testing!');
});

// Importing and using routes
const adminroutes = require("./routes/adminroutes");
const offerRoutes = require("./routes/offreroutes");
const actualiteRoute = require("./routes/actualiteroutes");
const portfolioRoutes = require('./routes/portfolioRoutes');
const authRoutes = require('./routes/authRoutes');
const postulationRoutes = require('./routes/postulationRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

app.use("/api", adminroutes);
app.use("/api", actualiteRoute);
app.use("/api", portfolioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", offerRoutes);
app.use("/api", postulationRoutes);
app.use("/api", newsletterRoutes);

// Handle 404 errors
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Page not found"
    });
});

// Start the server
app.listen(port, () => {
    console.log(`SERVER IS WORKING ON ${port}`);
});
