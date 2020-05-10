const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(b => b.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password == undefined || body.password.length < 3) {
      response.status(400).json({
          error: "Password is too short",
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try {
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    }
    catch(e) {
      response.status(400).json({
          error: e.message
      })
    }
})

module.exports = usersRouter
