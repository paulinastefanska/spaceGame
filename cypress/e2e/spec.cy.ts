const LOGIN_PAGE_URL = 'http://localhost:3000'
const GAME_PAGE_URL = LOGIN_PAGE_URL + '/game'

describe('Game test', () => {
  beforeEach(() => {
    cy.visit(LOGIN_PAGE_URL)
  })

  it('Logs in a user', () => {
    // Check if the user is logged in
    cy.get('#email-input').type('admin@admin.com')
    cy.get('#password-input').type('admin123')
    cy.get('form').submit()

    // Check if the user is redirected to the game page
    cy.url().should('include', GAME_PAGE_URL)

    // Check if the user selected radio button
    cy.get('#popup').should('be.visible')
    cy.get('#people-radio').click().should('be.checked')
    cy.get('#close-button').click()

    // Check if the user clicked the fight button
    cy.get('#fight-button').click()
  })
})
