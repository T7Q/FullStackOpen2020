import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

import { prettyDOM } from '@testing-library/dom'

describe('<Blog />', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Mark Doe',
    url: 'www.blogtest.com',
    likes: 100,
    user: {
      username: 'test',
      name: 'Test Test',
      id: '1',
    },
  }

  const username = 'tatiana'
  const mockUpdate = jest.fn()
  const mockRemove = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove} username={username} />
    )

    // component.debug()
  })

  test('blog renders the blogs title and author, but not url or number of likes', () => {
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent(`${blog.title}`)
    expect(div).toHaveTextContent(`${blog.author}`)
    expect(div).not.toHaveTextContent(`likes ${blog.likes}`)
    expect(div).not.toHaveTextContent(`${blog.url}`)
  })

  test('blogs url and number of likes are shown when the button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(`likes ${blog.likes}`)
    expect(div).toHaveTextContent(`${blog.url}`)
  })

  test('if the like button is clicked twice, the event handler is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})
