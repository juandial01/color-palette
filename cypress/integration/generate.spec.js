describe('Testing color palette', () => {
    beforeEach(()=>{
       cy.visit('https://juandial01.github.io/color-palette/')
        cy.wait(7000)
        
    })
    it('Generate colours', () => {
        cy.get('#generate').click()
        cy.wait(7000)
        cy.screenshot("1")
        cy.get('#generate').click()
        cy.wait(7000)
        cy.screenshot("2")
    })
  })