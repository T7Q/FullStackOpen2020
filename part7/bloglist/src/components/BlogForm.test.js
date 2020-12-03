import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm /> ', () => {
  test('if the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const addBlog = jest.fn()
    const component = render(<BlogForm addBlog={addBlog} />)

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    const formData = {
      author: 'Jane Doe',
      title: 'Hello World',
      url: 'www.helloworld.com',
    }

    fireEvent.change(author, {
      target: { value: formData.author }
    })
    fireEvent.change(title, {
      target: { value: formData.title }
    })
    fireEvent.change(url, {
      target: { value: formData.url }
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(formData.title )
    expect(addBlog.mock.calls[0][0].author).toBe(formData.author)
    expect(addBlog.mock.calls[0][0].url).toBe(formData.url)
  })
})
