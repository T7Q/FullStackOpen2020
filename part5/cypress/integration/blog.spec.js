const user = {
  username: 'tatiana',
  name: 'Tatiana K',
  password: '1234',
}

describe('Blog app', function () {
  beforeEach(function () {
    // cy.request('POST', 'http://localhost:3001/api/testing/reset');
    // cy.request('POST', 'http://localhost:3001/api/users', user)
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
})
