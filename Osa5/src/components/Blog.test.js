import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */


describe('Without user clicks', () => {
    const blog = {
        title: 'Esimerkkiotsikko',
        author: 'Esimerkki Kirjailija',
        url: 'Esimerkki.com',
        likes: 27
        }

        test('renders title and author of the blog', () => {
            render(<Blog blog={blog} />)

            screen.getByText(blog.title)
            screen.getByText(blog.author)
        })

        test('does not render url and likes of blog automatically', () => {
        
            const { container } = render(<Blog blog={blog} />)
            container.querySelector('.blog')
            expect(Blog.visible).not.toBeDefined()
        })
})

describe('User clicks buttons', () => {
    const blog = {
        title: 'Esimerkkiotsikko1',
        author: 'Esimerkki Kirjailija1',
        url: 'Esimerkki.com1',
        likes: 29
        }

    test('url and likes is shown after clicking view', async () => {
        
        const { container } = render(
            <Blog blog={blog} />
        )
        
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(blog.url)
        expect(div).toHaveTextContent(blog.likes)
        })

    test('component that handles likes is called twice', async () => {
      
        const mockHandler = jest.fn()

      
        render(
          <Blog blog={blog} HandleLike={mockHandler} />
        )
      
        const user = userEvent.setup()
        const view = screen.getByText('view')
        await user.click(view)

        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)
        
        expect(mockHandler.mock.calls).toHaveLength(2)
      })
})

describe('Adding a blog', () => {
    test('adding a blog has right info', async () => {
        const createBlog = jest.fn()

      
        const { container } = render(
          <BlogForm createBlog={createBlog} />
        )

        const title = container.querySelector('input[name="Title"]')
       
        const author = container.querySelector('input[name="Author"]')
        const url = container.querySelector('input[name="Url"]')

        await userEvent.type(title, 'Esimerkkiotsikko2')
        await userEvent.type(author, 'Esimerkki Kirjailija2')
        await userEvent.type(url, 'Esimerkki.com2')

        const user = userEvent.setup()
        await user.click(screen.getByText('create'))


        expect(createBlog.mock.calls.length).toBe(1)
        expect(createBlog.mock.calls[0][0]).toEqual({author: "Esimerkki Kirjailija2", title: "Esimerkkiotsikko2", 
        url: "Esimerkki.com2"})

    })
})