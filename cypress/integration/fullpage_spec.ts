describe('Chat App', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
    cy.get('body').screenshot()
  })
})
