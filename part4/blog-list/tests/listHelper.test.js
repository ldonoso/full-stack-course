const listHelper = require('../utils/list_helper')
const {listWithOneBlog, blogs} = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
    test('of empty list is 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a higher list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favoriteBlog', () => {
    test('of a one elem list', () => {
        const {title, author, likes} = listHelper.favoriteBlog(listWithOneBlog)
        expect({title, author, likes}).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('of an empty list is undefined', () => {
        const result  = listHelper.favoriteBlog([])
        expect(result).toBeUndefined()
    })

    test('of many blogs', () => {
        const {title, author, likes} = listHelper.favoriteBlog(blogs)
        expect({title, author, likes}).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })
})

describe('mostBlogs', () => {
    test('of a one elem list', () => {
        const res = listHelper.mostBlogs(listWithOneBlog)
        expect(res).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        })
    })

    test('of an empty list is undefined', () => {
        const result  = listHelper.mostBlogs([])
        expect(result).toBeUndefined()
    })

    test('of many blogs', () => {
        const res = listHelper.mostBlogs(blogs)
        expect(res).toEqual({
            author: "Robert C. Martin",
            blogs: 3,
        })
    })
})


describe('mostLikes', () => {
    test('of a one elem list', () => {
        const res = listHelper.mostLikes(listWithOneBlog)
        expect(res).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('of an empty list is undefined', () => {
        const result  = listHelper.mostLikes([])
        expect(result).toBeUndefined()
    })

    test('of many blogs', () => {
        const res = listHelper.mostLikes(blogs)
        expect(res).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })
})
