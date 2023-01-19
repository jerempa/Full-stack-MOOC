const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total_sum = 0
  blogs.map(like => { like.likes
    total_sum += like.likes
  })
  return total_sum
}

const favoriteBlog = (blogs) => {
  let max_likes_so_far = 0
  const favorite_blog = { }
  blogs.map(blog => { blog.likes
    if (blog.likes > max_likes_so_far){
      max_likes_so_far = blog.likes
      favorite_blog.title = blog.title
      favorite_blog.author = blog.author
      favorite_blog.likes = blog.likes
    }
  })
  return favorite_blog
}

const mostBlogs = (blogs) => {
  const groupBlogs = _.groupBy(blogs, 'author')
  const authorBlogs = _.map(groupBlogs, (blogs, author) => ({ author, blogs: blogs.length }))
  const authorWithMostBlogs = _.maxBy(authorBlogs, 'blogs')
  if (!authorWithMostBlogs){
    return {}
  }
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const totalLikes = {}
  _.forEach(blogs, blog => {
    if(totalLikes[blog.author]){
      totalLikes[blog.author] += blog.likes
    } else {
      totalLikes[blog.author] = blog.likes
    }
  })
  const authorWithMostLikes = _.maxBy(Object.keys(totalLikes), author => totalLikes[author])
  if (!authorWithMostLikes){
    return {}
  }
  return { author: authorWithMostLikes, likes: totalLikes[authorWithMostLikes] }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}