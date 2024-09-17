const elements = require('./elements').elements;


describe('Testes ao site Suacedemo', () => {
    it('Login com Sucesso', () => {
      cy.visit('https://www.saucedemo.com/v1')
      cy.get(elements.inputUserName).should('be.visible')
      cy.get(elements.inputUserName).type('standard_user')
      cy.get(elements.inputPassword).type('secret_sauce')
      cy.get(elements.buttonLogin).click()
      cy.get(elements.listProduct).should('be.visible')
      cy.get(elements.textFooter).should('be.visible')
      
            
    });
    it('Falha no login', () => {
        cy.visit('https://www.saucedemo.com/v1/')
        cy.get(elements.inputUserName).should('be.visible')
        cy.get(elements.inputUserName).type('locked_out_user')
        cy.get(elements.inputPassword).type('secret_sauce')
        cy.get(elements.buttonLogin).click()
        cy.get(elements.textError).should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
                
    });

    it('Visualizar produtos', () => {
      cy.visit('https://www.saucedemo.com/v1')
      cy.get(elements.inputUserName).should('be.visible')
      cy.get(elements.inputUserName).type('standard_user')
      cy.get(elements.inputPassword).type('secret_sauce')
      cy.get(elements.buttonLogin).click()
      cy.get(elements.textLink4).should('be.visible')
      cy.get(elements.textLink0).should('be.visible')
      cy.get(elements.textLink1).should('be.visible')
      cy.get(elements.textLink5).should('be.visible')
      cy.get(elements.textLink2).should('be.visible')
      cy.get(elements.textLink3).should('be.visible')

      
    });

    it('Adicionar no carrinho', () => {
      cy.visit('https://www.saucedemo.com/v1')
      cy.get(elements.inputUserName).should('be.visible')
      cy.get(elements.inputUserName).type('standard_user')
      cy.get(elements.inputPassword).type('secret_sauce')
      cy.get(elements.buttonLogin).click()          
      cy.get(elements.imageLink4).click()
      cy.get(elements.buttonPrimary).click()
      cy.get(elements.buttonCartTop).click()
      cy.get(elements.buttonCartReturn).click()
      cy.get(elements.buttonItemBuy3).click()
      cy.get(elements.buttonItemBuy6).click()
      cy.get(elements.buttonCartTop).click()
      cy.get(elements.textLink4).should('have.text', 'Sauce Labs Backpack' )
      cy.get(elements.textLink1).should('have.text', 'Sauce Labs Bolt T-Shirt')
      cy.get(elements.textLink3).should('have.text', 'Test.allTheThings() T-Shirt (Red)')
    });

    it('Remover do carrinho', () => {
      cy.visit('https://www.saucedemo.com/v1')
      cy.get(elements.inputUserName).should('be.visible')
      cy.get(elements.inputUserName).type('standard_user')
      cy.get(elements.inputPassword).type('secret_sauce')
      cy.get(elements.buttonLogin).click()         
      cy.get(elements.imageLink4).click()
      cy.get(elements.buttonPrimary).click() 
      cy.get(elements.buttonCartTop).click()
      cy.get(elements.buttonCartReturn).click()
      cy.get(elements.buttonItemBuy3).click()
      cy.get(elements.buttonItemBuy6).click()
      cy.visit('https://www.saucedemo.com/v1/cart.html')
      cy.get(elements.textLink4).should('have.text', 'Sauce Labs Backpack')
      cy.get(elements.textLink1).should('have.text', 'Sauce Labs Bolt T-Shirt')
      cy.get(elements.textLink3).should('have.text', 'Test.allTheThings() T-Shirt (Red)')
      cy.get(elements.buttonItemBuy4).click()
      cy.get(elements.textLink4).should('have.text', 'Sauce Labs Backpack')
      cy.get(elements.textLink3).should('have.text', 'Test.allTheThings() T-Shirt (Red)')
    });

    it('Remover do carrinho com zero itens', () => {
      cy.visit('https://www.saucedemo.com/v1')
      cy.get(elements.inputUserName).should('be.visible')
      cy.get(elements.inputUserName).type('standard_user')
      cy.get(elements.inputPassword).type('secret_sauce')
      cy.get(elements.buttonLogin).click()         
      cy.get(elements.imageLink4).click()
      cy.get(elements.buttonPrimary).click() 
      cy.get(elements.buttonCartTop).click()
      cy.get(elements.flagCartItem).should('be.visible')
      cy.get(elements.buttonRemoveCart).click()
      cy.get(elements.flagCartItem).should('not.exist')
 
    });

    it('Finalização da compra', () => {
      cy.visit('https://www.saucedemo.com/v1')
      cy.get(elements.inputUserName).should('be.visible')
      cy.get(elements.inputUserName).type('standard_user')
      cy.get(elements.inputPassword).type('secret_sauce')
      cy.get(elements.buttonLogin).click()         
      cy.get(elements.imageLink4).click()
      cy.get(elements.buttonPrimary).click() 
      cy.get(elements.buttonCartTop).click()
      cy.get(elements.textItemNameCart).should('be.visible')
      cy.get(elements.buttonFinish).click()
      cy.get(elements.inputName).type('Ever')
      cy.get(elements.inputLastName).type('Ton')
      cy.get(elements.inputPostalCode).type('18656000')
      cy.get(elements.buttonPrimary).click()
      cy.get(elements.textSubTotal).should('have.text', 'Item total: $29.99')
      cy.get(elements.textTax).should('have.text', 'Tax: $2.40')
      cy.get(elements.textTotalBuy).should('have.text', 'Total: $32.39')
      cy.get(elements.buttonFinish).click()
      cy.get(elements.textFinishBuy).should('have.text', 'THANK YOU FOR YOUR ORDER')

    });

  });


