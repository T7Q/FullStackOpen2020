const blogRouter = require('express').Router()
const { Mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  blog.user = user

  const result = await blog.save()

  user.blogs = user.blogs.concat(result.id)
  await user.save()
  response.json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decoded = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decoded.id)

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return repsponse.status(404).json({ error: 'blog does not exist' })
  }

  if (!token || !decoded.id || !user || blog.user.toString() != user.id) {
    return response.status(401).json({ error: 'only blog creator can delete this blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updateBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const token = request.token
  const decoded = jwt.verify(token, process.env.SECRET)
  const comment = request.body.comment
  const user = await User.findById(decoded.id)

  if (!comment) {
    return response.status(400).json({ error: 'comment is fieled is empty' })
  }

  if (!token || !decoded.id || !user) {
    return response.status(401).json({ error: 'token is invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(comment)
  const result = await blog.save()
  console.log(result)
  response.json(result)
})

module.exports = blogRouter
