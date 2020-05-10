const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1})
    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({})

    const blog = new Blog({
        ...body,
        user: user._id,
    })

    try {
      const blogDb = await blog.save()
      user.blogs =  user.blogs.concat(blogDb._id)
      await user.save()
      response.status(201).json(blogDb)
    }
    catch(e) {
      response.status(400).send()
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).send()
})

blogsRouter.put('/:id', async (req, res, next) => {
    const update = {
        likes: req.body.likes,
    }

    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true })
        res.json(blog.toJSON())
    }
    catch (error) {
        next(error)
    }
})

module.exports = blogsRouter
