const bcrypt = require('bcrypt')
const userRoute = require('express').Router()
const User = require('../models/user')

userRoute.post('/', async (request, response) => {
  const body = request.body
  if (!body.password) {
    return response.status(400).json({ error: 'password required' })
  } else if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be 3 characters or longer' })
  }

  const saltRounds = 10
  const password= await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

userRoute.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users)
})

module.exports = userRoute
