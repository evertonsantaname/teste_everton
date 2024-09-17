describe('Meu primeiro teste', () => {
    it.only('Visita um site', () => {
      cy.visit('https://sandbox.melhorenvio.com.br/login')
      cy.get('#username').type('evertonsantana@melhorenvio.com')
      cy.get('#password').type('13092024Mel@')
      cy.get('.button-new').click()

    

    });
    
  });