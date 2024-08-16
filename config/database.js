const mongoose = require('mongoose');
require('dotenv').config();
const DB = process.env.DB_URL;
// const DB = "mongodb+srv://a36282303:gk74lc4cYOO5FZig@az.sn2laxp.mongodb.net/"

mongoose.connect(`${DB}`)
    .then(() => {
        console.log(`Database connected successfully`);
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });