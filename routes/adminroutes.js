const express = require("express");
const adminControllers = require("../controllers/admincontrollers");
const adminRoute = express.Router();
adminRoute.use(express.json());

adminRoute.get('/admin', adminControllers.getAdmin);
adminRoute.get('/admin/:id', adminControllers.getAdminById);
adminRoute.post('/admin', adminControllers.createAdmin);
adminRoute.put('/admin/:id', adminControllers.putAdmin);
adminRoute.delete('/admin/:id', adminControllers.deleteAdmin);

module.exports = adminRoute;