const blog = require('../models/blog')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, value) => sum + value.likes, 0) || 0
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const favoriteIndex = likes.indexOf(Math.max(...likes))

  return blogs[favoriteIndex]
}

const mostBlogs = (blogs) => {
  const author = _.chain(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .sortBy('blogs')
    .last()
    .value()
  return author
}

const mostLikes = (blogs) => {
  const author = _.chain(blogs)
    .groupBy('author')
    .map((obj, key) => ({ author: key, likes: _.sumBy(obj, 'likes') }))
    .sortBy('likes')
    .last()
    .value()
  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
