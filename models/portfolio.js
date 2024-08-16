const mongoose = require('mongoose');
 
const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});
 
const Portfolio = mongoose.model('Portfolio', portfolioSchema);
 
module.exports = Portfolio;