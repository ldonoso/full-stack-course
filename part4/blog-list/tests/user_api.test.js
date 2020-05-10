const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blogs')
const app = require('../app')
const helper = require('./test_helper')

api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = helper.blogs.map(b => {
        return new Blog(b)
    })

    await Promise.all(blogs.map(b =>
        b.save()
    ))
})

test('blogs get', async () => {
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blogs.body).toHaveLength(helper.blogs.length)
})


afterAll(() => {
    mongoose.connection.close()
})
