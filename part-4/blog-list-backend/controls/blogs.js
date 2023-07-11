const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  let { author, title, likes, url, userId } = request.body;

  const user = request.user;

  likes = likes ? likes : 0;

  const blog = new Blog({
    author,
    title,
    likes,
    url,
    user: user.id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

// delete blog
blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  const user = request.user;

  const blog = await Blog.findById(id);

  if (blog.user?.toString() === user._id?.toString()) {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } else {
    return response.status(401).json({
      error: 'unauthorized process!'
    });
  }
});

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const updatedBlog = {
    ...body,
    likes: body.likes
  };

  const updated = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });

  response.json(updated);
});

module.exports = blogRouter;
