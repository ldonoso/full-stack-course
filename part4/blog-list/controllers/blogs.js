const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
      const blog = new Blog(request.body)

    try {
      const result = await blog.save()
      response.status(201).json(result)
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
