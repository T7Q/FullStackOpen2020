const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

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

  await api.post('/api/blogs').send(newPost).expect(201)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(testBlogs.length + 1)
  expect(response.body).toContainEqual(expect.objectContaining(newPost))
})

test('likes property set to 0 if missing', async () => {
  const newPost = {
    title: 'Hello world',
    author: 'Joe Doe',
    url: 'https://newpost.com/',
  }

  const savedPost = await api.post('/api/blogs').send(newPost)

  expect(savedPost.body).toHaveProperty('likes', 0)
})

test('adding blog with missing title or url returns status 400', async () => {
  const postWithoutUrl = {
    title: 'Hello world',
    author: 'Joe Doe',
  }

  const temp = await api.post('/api/blogs').send(postWithoutUrl)
})

test('can delete existing post', async () => {
  const blogs = await api.get('/api/blogs')
  const id = blogs.body[0].id

  await api.delete(`/api/blogs/${id}`)

  const updatedBlogs = await api.get('/api/blogs')
  expect(updatedBlogs.body.length).toBe(blogs.body.length - 1)

  const newBlogs = updatedBlogs.body
  const postDoesNotExist = await newBlogs.find((post) => post.id === id)
  expect(postDoesNotExist).not.toBeDefined()
})

test('existing post can be updated', async () => {
  const blogsBefore = await api.get('/api/blogs')
  const blogToUpdate = blogsBefore.body[0]
  blogToUpdate.likes = 1000

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200)

  const blogsAfter = await api.get('/api/blogs')

  const after = blogsAfter.body
  const updatedBlog = await after.find((blog) => blog.id === blogToUpdate.id)
  expect(updatedBlog.title).toEqual(blogToUpdate.title)
  expect(updatedBlog.author).toEqual(blogToUpdate.author)
  expect(updatedBlog.url).toEqual(blogToUpdate.url)
  expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Jane', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    

    const newUser = {
      username: 'newuser',
      name: 'Tatiana Kuumola',
      password: 'password',
    }

    await api.post('/api/users').send(newUser).expect(200)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('no user created if username is not provided', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: "Jane Doe",
      password: 'password'
    }
    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toBeDefined
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    
  })

  test('no user created if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "Me",
      password: "password"
    }

    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toBeDefined()

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('no user created if password is not provided', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "Me",
      name: "Jane"
    }

    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toBeDefined()

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('no user created if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log("BEFORE", usersAtStart, usersAtStart.length)
    const newUser = {
      username: "Me",
      name: "Jane",
      password: "12"
    }

    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toBeDefined()

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
