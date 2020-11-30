const blogRouter = require('express').Router()
const { Mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const users = await User.find({})
    const user = users[0]
    blog.user = user

    const result = await blog.save()

    user.blogs = user.blogs.concat(result)
    await user.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updateBlog)
})

module.exports = blogRouter
