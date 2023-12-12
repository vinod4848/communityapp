const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

// Routes
router.get('/blogs/search', blogController.searchBlogByTitle);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', blogController.addBlog);
router.put('/blogs/:id', blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);


module.exports = router;
