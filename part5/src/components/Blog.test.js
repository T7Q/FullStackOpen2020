import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
  const testUpdate = jest.fn()
  const testRemove = jest.fn()

  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={testUpdate} removeBlog={testRemove} username={username} />
    )
    // component.debug()
  })

  test('blog renders the blogs title and author, but not url or number of likes', () => {
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('Blog Title')
    expect(div).toHaveTextContent('Mark Doe')
    expect(div).not.toHaveTextContent('likes');
    expect(div).not.toHaveTextContent('www.blogtest.com');
  })
})
