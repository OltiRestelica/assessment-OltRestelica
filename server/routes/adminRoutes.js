const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

const adminPanel = require('../controllers/AdminController');

router.get('/adminPanel', authMiddleware, isAdmin, adminPanel);

module.exports = router;