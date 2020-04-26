const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (acc, blog) => blog.likes > acc.likes ? blog : acc
    if (blogs.length === 0)
        return undefined
    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return undefined

    grouped =
        _.chain(blogs)
        .groupBy('author')
        .map((matches, author) => ({author, blogs: matches.length}))
        .value()

    const reducer = (acc, cand) => cand.blogs > acc.blogs ? cand : acc;
    return grouped.reduce(reducer)
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return undefined

    grouped =
        _.chain(blogs)
        .groupBy('author')
        .map((matches, author) => ({author, likes: totalLikes(matches)}))
        .value()

    const reducer = (acc, cand) => cand.likes > acc.likes ? cand : acc;
    return grouped.reduce(reducer)
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
