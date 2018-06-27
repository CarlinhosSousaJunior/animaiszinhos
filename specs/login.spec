describe('Eu como usuário desejo entrar no sistema informando um e-mail e senha', function() {	
	const URL_LOGIN = 'http://localhost:8080/animaiszinhos/#!/login';
	const URL_HOME = 'http://localhost:8080/animaiszinhos/#!/animais';
	
	var usuario = {
		email: 'rudsonm@edu.univali.br',
		senha: '123456'
	};
	
  it('logar com sucesso', function() {
	  
    cy.visit(URL_HOME)
	
	cy.get('#usuario').type(usuario.email)
	cy.get('#senha').type(usuario.senha)
    cy.get('#entrar').click()
	cy.url().should('eq',URL_HOME)
	cy.get('.material-icons > a').click()
  })
  
  it('logar com erro', function() {
	  
    cy.visit(URL_HOME)
	
	cy.get('#usuario').type(usuario.email)
	cy.get('#senha').type('senha incorreta')
    cy.get('#entrar').click()
	cy.url().should('eq',URL_LOGIN)	
  })
})