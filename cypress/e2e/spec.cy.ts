const HOME_PAGE_URL = 'http://localhost:3000'
const GAME_PAGE_URL = HOME_PAGE_URL + '/game'

describe('Game test', () => {
  beforeEach(() => {
    cy.visit(HOME_PAGE_URL)
  })

  it('Logs in a user and plays the game', () => {
    // Check if the user is logged in
    cy.visit(HOME_PAGE_URL)
    cy.get('#email-input').type('admin@admin.com')
    cy.get('#password-input').type('admin123')
    cy.get('form').submit()

    // Check if the user is redirected to the game page
    cy.url().should('include', GAME_PAGE_URL)

    // Check if the user selected radio button
    cy.get('#popup').should('be.visible')
    cy.get('#people-radio').click().should('be.checked')
    cy.get('#close-button').click()

    // Check if the game statistics is hidden
    cy.get('#game-statistics').should('not.be.visible')

    // Check if the user clicked the fight button
    cy.get('#fight-button').click()
  
    // Check if user clicked the start new game button
    cy.get('#play-again-button').click()

    // Check if the user selected other radio button
    cy.get('#popup').should('be.visible')
    cy.get('#starships-radio').click().should('be.checked')
    cy.get('#close-button').click()

    // Check if the user clicked the fight button again
    cy.get('#fight-button').click()
  })
})
