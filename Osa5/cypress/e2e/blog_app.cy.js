/* eslint-disable no-undef */

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const test_user = {
      username: 'Teemu123',
      name:'Teemu testaaja',
      password: 'Salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', test_user)
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('blogs').should('not.exist')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('Teemu123')
    cy.get('#password').type('Salasana')
    cy.get('#login-button').click()

    cy.contains('Teemu testaaja logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('Teme testaaja')
    cy.get('#password').type('Salasana')
    cy.get('#login-button').click()

    cy.contains('Wrong username or password')
  })

  describe('When logged in', function() {
    beforeEach(function() {

      cy.login({username: 'Teemu123', password: 'Salasana'})
      cy.createBlog({title: 'Liked blog', author: 'Liked author', url: 'Likes.com', likes: 15})
      cy.createBlog({title: 'Liked blog1', author: 'Liked author1', url: 'Likes1.com', likes: 2})
      cy.createBlog({title: 'Liked blog2', author: 'Liked author2', url: 'Likes2.com', likes: 37})
    })

    it('A blog can be created', function() {
      cy.contains('button', 'new blog').click()
      cy.get('#title').type('Esimerkkiotsikko')
      cy.get('#author').type('Esimerkki Kirjailija')
      cy.get('#url').type('Esimerkki.com')
      cy.get('#submit').click()

      cy.contains('Esimerkkiotsikko')
      cy.contains('Esimerkki Kirjailija')
    })

    it('A blog can be liked', function() {
      
      cy.contains('Liked blog')
      cy.contains('Liked author')

      cy.get('#view').click()
      cy.contains('Likes2.com')

      cy.get('#like').click()
      cy.contains('likes 38')
    })

    it('A blog can be removed', function() {
      
      cy.contains('Liked blog2')
      cy.contains('Liked author2')

      cy.get('#view').click()
      cy.contains('Likes2.com')

      cy.get('#remove').click()
      cy.get('Liked blog2').should('not.exist')
      cy.get('Liked author2').should('not.exist')
    })

    it('blogs are sorted by like count from largest to smallest', function() {
      cy.get('.blog').each(($element) => {
        cy.wrap($element).find('#view').click()
        })
        cy.get('#root > :nth-child(1) > :nth-child(4)').should('contain', 'Liked blog2')
        cy.get('#root > :nth-child(1) > :nth-child(5)').should('contain', 'Liked blog')
        cy.get('#root > :nth-child(1) > :nth-child(6)').should('contain', 'Liked blog1')
  })
  })

})