const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blogs')
const User = require('../models/users')
const app = require('../app')
const helper = require('./test_helper')

api = supertest(app)

const name = "Mike Miller"

describe('Blog tests', () => {
    beforeAll(async () => {
        await api.post('/api/users')
            .send({
            username: "Mike",
            name: name,
            password: "pass",
        })
        .expect(201)
    })

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

    test('exists id', async () => {
        const blogs = await api.get('/api/blogs')
        const blog = blogs.body[0]
        expect(blog.id).toBeDefined()
    })

    test('create blog', async () => {
        const blog = {
            title: "Dependent types",
            author: name,
            url: "http://goole.es",
            likes: 2,
        }

        await api.post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.blogs.length + 1)

        const titles = blogs.map(b => b.title)
        expect(titles).toContain('Dependent types')
    })

    test('create blog without like defaults 0', async () => {
        const blog = {
            title: "Dependent types",
            author: "Mike Miller",
            url: "http://goole.es",
        }

        const result = await api.post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const blogDb = blogs.find(b => b.author === 'Mike Miller')

        expect(blogDb.likes).toEqual(0)
    })

    test('blog without title and url can not be created', async () => {
        const blog = {
            author: "Mike Miller",
            likes: 5
        }

        const result = await api.post('/api/blogs')
            .send(blog)
            .expect(400)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(blogs.length)
    })

    test('delete blog', async () => {
        const blog = helper.blogs[0]

        const result = await api.delete(`/api/blogs/${blog._id}`)
            .expect(204)

        const blogs = await helper.blogsInDb()
        expect(blogs.map(b => b._id)).not.toContain(blog._id)
    })

    test('update blog', async () => {
        const blog = helper.blogs[0]
        const update = {
            likes: 3333,
        }

        const result = await api.put(`/api/blogs/${blog._id}`)
            .send(update)
            .expect(200)

        expect(result.body.likes).toEqual(3333)
    })
})

describe('User tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    const sendAndCheck400 = async (user) => {
        await api.post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    }

    test('User without username can not be created', async () => {
        const user = {
            name: "Mike Miller",
            password: "pass",
        }

        await sendAndCheck400(user)
    })

    test('User without short username can not be created', async () => {
        const user = {
            username: "M",
            name: "Mike Miller",
            password: "pass",
        }

        await sendAndCheck400(user)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
