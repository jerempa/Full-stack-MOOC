const listHelper = require('../utils/list_helper')

let blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('every blog', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

  test('two values', () => {
    const one_blog = [    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }]
    expect(listHelper.totalLikes(one_blog)).toBe(7)
  })

  test('no values', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe('Favorite blog', () => {

  test('favoriteBlog returns correct blog', () => {
    const correct = { title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12 }
    expect(listHelper.favoriteBlog(blogs)).toEqual(correct)
  })

  test('favoriteBlog return empty object if list is empty', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('favoriteBlog returns first blog if there are equal likes', () => {
    const correct = { title: 'Esimerkki blogi',
      author: 'Digsjar Eikstra',
      likes: 12 }
    blogs.unshift(correct)
    expect(listHelper.favoriteBlog(blogs)).toEqual(correct)
  })
})

describe('Most blogs', () => {

  test('mostBlogs returns correct author', () => {
    blogs.splice(0, 1)
    const correct = {
      author: 'Robert C. Martin',
      blogs: 3 }
    expect(listHelper.mostBlogs(blogs)).toEqual(correct)
  })

  test('mostBlogs return empty object if list is empty', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('mostBlogs returns some author if there are equal amount of blogs', () => {
    const new_blog = { _id: '123',
      title: 'Esimerkkiblogi',
      author: 'Edsger W. Dijkstra',
      url: 'esimerkki.com',
      likes: 2,
      __v: 0 }
    blogs.unshift(new_blog)
    const correct = {
      author: 'Edsger W. Dijkstra',
      blogs: 3 }
    expect(listHelper.mostBlogs(blogs)).toEqual(correct)
  })
})

describe('Most likes', () => {

  test('mostLikes returns correct author', () => {
    blogs.splice(0, 1)
    const correct = {
      author: 'Edsger W. Dijkstra',
      likes: 17 }
    expect(listHelper.mostLikes(blogs)).toEqual(correct)
  })

  test('mostBlogs return empty object if list is empty', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('mostLikes returns some author if there are equal amount of likes', () => {
    // blogs.splice(0, 1)
    const new_blog = { _id: '123',
      title: 'Esimerkkiblogi',
      author: 'Robert C. Martin',
      url: 'esimerkki.com',
      likes: 5,
      __v: 0 }
    blogs.unshift(new_blog)
    const correct = {
      author: 'Robert C. Martin',
      likes: 17 }
    expect(listHelper.mostLikes(blogs)).toEqual(correct)
  })
})