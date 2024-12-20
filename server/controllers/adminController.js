const AdminUser = require("../models/adminUser");

// Create an admin user
exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = new AdminUser(req.body);
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all admin users
exports.getAdmins = async (req, res) => {
    try {
        const admins = await AdminUser.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an admin user
exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await AdminUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an admin user
exports.deleteAdmin = async (req, res) => {
    try {
        await AdminUser.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};