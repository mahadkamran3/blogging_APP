const express = require('express');
const router = express.Router();
const { createBlog, updateBlog, deleteBlog } = require('../controllers/blogControllers');
const auth = require('../middlewares/authMiddleware');

router.post('/create', auth, createBlog);

router.put('/:id', auth, updateBlog);

router.delete('/:id', auth, deleteBlog);

module.exports = router;
