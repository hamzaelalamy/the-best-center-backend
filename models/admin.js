const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        max: 64
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    role: {
        type: String,
        default: 'admin',
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;