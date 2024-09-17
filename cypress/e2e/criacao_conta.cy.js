import auth from '../../../support/util/auth';



const fs = require('fs');
const faker = require('faker-br');

const user = {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  cpf: faker.br.cpf(),
  cpfInvalido: "111.111.111-11",
  telefoneInvalido: "00000000000",
  dataNascimento: faker.date.past(50, new Date(2000, 0, 1)).toISOString().split('T')[0],
  senha: faker.internet.password(),
  cep: "96055-710",
  numeroEndereço: "949",
  complemento: "Sede Melhor Envio"
};

const gerarTelefoneCelular = () => {
  const DDD = faker.address.zipCode().slice(0, 2); // Obtém dois primeiros dígitos para o código de área
  const primeiraParte = `9${faker.random.number({min: 1000, max: 9999})}`; // Sempre começa com '9' seguido de quatro dígitos
  const segundaParte = faker.random.number({min: 1000, max: 9999}); // Quatro últimos dígitos
  return `(${DDD}) ${primeiraParte}-${segundaParte}`;
};

const gerarDataNascimento = () => {
  const hoje = new Date();
  const idadeMaxima = 99;
  const idadeMinima = 18;
  const dataMaxima = new Date(hoje.getFullYear() - idadeMinima, hoje.getMonth(), hoje.getDate());
  const dataMinima = new Date(hoje.getFullYear() - idadeMaxima, hoje.getMonth(), hoje.getDate());
  const dataRandomica = faker.date.between(dataMinima, dataMaxima);
  // Formate a data como dd/mm/aaaa
  const dia = String(dataRandomica.getDate()).padStart(2, '0');
  const mes = String(dataRandomica.getMonth() + 1).padStart(2, '0');
  const ano = dataRandomica.getFullYear();
  return `${dia}/${mes}/${ano}`;
};


describe('Meu primeiro teste', () => {
  it.only('Visita um site', () => {
    cy.visit('https://me-staging.melhorenvio.work/cadastre-se')
    //cy.wait(3000)
    //cy.get(':nth-child(1) > .cf2Lf6').click()
    //cy.get('.btn-border').click()
  
    cy.get('#iptNome').type(user.nome)
    cy.get('#iptEmail').type(user.email)
    cy.get('[data-cy="lead-button-register"]').click()
    cy.wait(5000)
    cy.get('#iptCPF').type(user.cpf)
    cy.get('#iptDtNascimento').type(gerarDataNascimento())
    cy.get('#iptCelular').type(gerarTelefoneCelular())
    cy.get('.form-box-input').type(user.senha)
    cy.get('#chkTermos').click({force: true})  
    cy.wait(5000)
    cy.get('[data-cy="personal-button-submit"]').click()
    

    cy.get('#iptCepEmpresa').type(user.cep)
    cy.get('#iptEnderecoEmpresa').click()
    cy.wait(1000)
    cy.get('#iptNumeroEmpresa').type(user.numeroEndereço)
    cy.get('[data-cy="company-button-confirm"]').click()

    cy.get('[data-cy="online-button-no"] > .card__inner-container > .card-text').click()
    cy.get('[data-cy="online-button-skip-form"]').click()
  });
  
});