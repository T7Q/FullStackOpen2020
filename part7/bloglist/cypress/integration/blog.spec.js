const user = {
  username: 'tatiana',
  name: 'Tatiana K',
  password: '1234',
}

const newBlog = {
  title: 'hello world',
  author: 'John Doe',
  url: 'www.whoohoo.com',
  likes: 0,
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login Form', function () {
    it('login success with right credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type(`${user.username}`)
      cy.get('#password').type(`${user.password}`)
      cy.get('#login-button').click()

      cy.contains(`${user.name} logged in`)
    })

    it('login fails with wrong password', function () {
      cy.contains('login').click()
      cy.get('#username').type(`${user.username}`)
      cy.get('#password').type(`wrong`)
      cy.get('#login-button').click()

      cy.contains('wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('wrong username or password').should(
        'have.css',
        'border',
        '1px solid rgb(255, 0, 0)'
      )
      cy.get('html').should('not.contain', `${user.name} logged in`)
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('#title').type(`${newBlog.title}`)
      cy.get('#author').type(`${newBlog.author}`)
      cy.get('#url').type(`${newBlog.url}`)
      cy.get('#createBtn').click()
      cy.get('#blogList > *').should('have.length', 1)
      cy.contains(`${newBlog.title}`)
      cy.contains(`${newBlog.author}`)
    })

    it('User can like a blog', function () {
      cy.contains('new note').click()
      cy.get('#title').type(`${newBlog.title}`)
      cy.get('#author').type(`${newBlog.author}`)
      cy.get('#url').type(`${newBlog.url}`)
      cy.get('#createBtn').click()
      cy.get('#toggleBtn').click()
      cy.contains('likes 0')
      cy.get('#likeBtn').click()
      cy.contains('likes 1')
    })

    it('User who created a blog can delete it', function () {
      cy.createBlog(newBlog)
      cy.get('#blogList > *').should('have.length', 1)
      cy.get('#toggleBtn').click()
      cy.get('#removeBtn').click()
      cy.get('#blogs > *').should('have.length', 0)
    })

    it('Other user cannot delete the blog', function () {
      cy.createBlog(newBlog)
      cy.contains('logout').click()
      const otherUser = {
        username: 'otherUser',
        name: 'Other K',
        password: '1234',
      }
      cy.request('POST', 'http://localhost:3001/api/users', otherUser)
      cy.get('#username').type(`${otherUser.username}`)
      cy.get('#password').type(`${otherUser.password}`)
      cy.get('#login-button').click()
      cy.get('#toggleBtn').click()
      cy.get('#removeBtn').should('not.exist')
    })

    it('Blogs are ordered according to likes, most likes being first', function () {
      cy.createBlog(newBlog)
      const otherBlog = {
        title: 'Most liked',
        author: 'Marry Doe',
        url: 'www.hi.com',
        likes: 100,
      }
      cy.createBlog(otherBlog)
      cy.get('#blogList').first().contains('Most liked')
    })
  })
})
