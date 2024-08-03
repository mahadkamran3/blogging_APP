const Blog = require('../models/blog');
const createError = require('http-errors');

const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({
      title,
      content,
      author: req.user.id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      throw createError(404, 'Blog not found');
    }

    if (blog.author.toString() !== req.user.id) {
      throw createError(403, 'Not authorized to edit this blog');
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.updatedAt = Date.now();

    await blog.save();
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      throw createError(404, 'Blog not found');
    }

    if (blog.author.toString() !== req.user.id) {
      throw createError(403, 'Not authorized to delete this blog');
    }

    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBlog, updateBlog, deleteBlog };
