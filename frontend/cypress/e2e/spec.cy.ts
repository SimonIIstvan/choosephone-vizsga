describe('Főoldal betöltődik', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Okostelefont keresel?')
  })
})
