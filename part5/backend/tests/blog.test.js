const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token = ''

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
  await User.deleteMany({})

  const user = {
    username: 'tati',
    name: 'Tati Doe',
    password: '1234',
  }

  const createdUser = await api.post('/api/users').send(user)
  const loggedInUser = await api
    .post('/api/login')
    .send({ username: user.username, password: user.password })
  token = loggedInUser.body.token

  for (let blog of testBlogs) {
    let blogObject = new Blog(blog)
    blogObject.user = createdUser.body.id
    await blogObject.save()
  }
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

test('existing post can be updated', async () => {
  const blogsBefore = await helper.blogsInDb()
  const blogToUpdate = blogsBefore[0]
  blogToUpdate.likes = 1000

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200)

  const blogsAfter = await helper.blogsInDb()

  const updatedBlog = await blogsAfter.find((blog) => blog.id === blogToUpdate.id)
  expect(updatedBlog.title).toEqual(blogToUpdate.title)
  expect(updatedBlog.author).toEqual(blogToUpdate.author)
  expect(updatedBlog.url).toEqual(blogToUpdate.url)
  expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
})

describe('authorization required', () => {
  test('can create valid blog', async () => {
    const newPost = {
      title: 'New post',
      author: 'New author',
      url: 'https://newpost.com/',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await helper.blogsInDb()

    expect(updatedBlogs).toHaveLength(testBlogs.length + 1)

    const author = updatedBlogs.map((blog) => blog.author)
    expect(author).toContain('New author')
  })

  test('likes property set to 0 if missing', async () => {
    const newPost = {
      title: 'Hello world',
      author: 'Joe Doe',
      url: 'https://newpost.com/',
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await helper.blogsInDb()
    const addedPost = await updatedBlogs.find((blog) => blog.title === 'Hello world')

    expect(addedPost.likes).toEqual(0)
  })

  test('adding blog with missing title or url returns status 400', async () => {
    const postWithoutUrl = {
      author: 'Joe Doe',
    }

    await api
      .post('/api/blogs')
      .send(postWithoutUrl)
      .set('authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('can delete existing post', async () => {
    const blogs = await helper.blogsInDb()
    const id = blogs[0].id

    await api.delete(`/api/blogs/${id}`).set('authorization', `Bearer ${token}`).expect(204)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs.length).toBe(blogs.length - 1)

    const newBlogs = updatedBlogs
    const postDoesNotExist = await newBlogs.find((post) => post.id === id)
    expect(postDoesNotExist).not.toBeDefined()
  })

  test('creation blog as unathorized user returns 401', async () => {
    const newPost = {
      title: 'Super new',
      author: 'Marry Doe',
      url: 'https://supernew.com/',
      likes: 17,
    }

    const result = await api.post('/api/blogs').send(newPost).expect(401)
    expect(result.body.error).toBeDefined()
  })

  test('creation blog with invalid token returns 401', async () => {
    const newPost = {
      title: 'Super new',
      author: 'Paul Doe',
      url: 'https://supernew.com/',
      likes: 17,
    }

    const result = await api
      .post('/api/blogs')
      .send(newPost)
      .set('authorization', `Bearer ${token}1`)
      .expect(401)
    expect(result.body.error).toBeDefined()
  })
})

describe('user mngt, when there is initially one user in db', () => {
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
      name: 'Jane Doe',
      password: 'password',
    }
    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toBeDefined
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('no user created if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Me',
      password: 'password',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toBeDefined()

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('no user created if password is not provided', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Me',
      name: 'Jane',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toBeDefined()

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('no user created if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'Me',
      name: 'Jane',
      password: '12',
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
