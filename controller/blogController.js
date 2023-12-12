const Blog = require("../models/blogModel");
const blogController = {
  addBlog: async (req, res) => {
    try {
      const newBlog = new Blog(req.body);
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchBlogByTitle: async (req, res) => {
    try {
      const { title } = req.query;

      if (!title) {
        return res.status(400).json({ message: 'Please provide a title parameter' });
      }

      const blogs = await Blog.find({ title: new RegExp(title, 'i') });

      if (blogs.length === 0) {
        return res.status(404).json({ message: 'No blogs found with the provided title' });
      }

      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = blogController;
