const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')

const api = supertest(app)

const testBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await new Blog(testBlogs[0]).save()
  await new Blog(testBlogs[1]).save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(2)
})

test('unique identifier property of the blog posts', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('request creates a new blog post', async () => {
  const newPost = {
    title: 'New post',
    author: 'Jane Doe',
    url: 'https://newpost.com/',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(testBlogs.length + 1)
  expect(response.body).toContainEqual(expect.objectContaining(newPost))
})

afterAll(() => {
  mongoose.connection.close()
})
