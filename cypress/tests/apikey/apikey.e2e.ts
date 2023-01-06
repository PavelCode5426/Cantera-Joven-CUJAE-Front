describe('Comprobando funcionamiento de la solicitud de token de acceso', () => {
  let testTokens: object[]

  before(() => {
    cy.fixture('apikey.json').then(({ credentials, tokens }) => {
      cy.login(credentials.username, credentials.password)
      cy.visit(Cypress.env('ADMIN_URL'))

      testTokens = tokens
    })
  })

  it('Comprobar la carga de la pagina', () => {
    cy.clickElements(['nav-item-ajustes', 'nav-item-api-key'])
    cy.contains('API KEYs')
  })

  it('Comprobar la adicion de un nuevo token', () => {
    cy.getBySel('add-api-key').click()
    cy.contains('Nombre del Sistema')
    cy.contains('Fecha de Expiracion')
    cy.getBySel('btn-cancel-api-key-form').click()

    testTokens.forEach((token) => {
      cy.getBySel('add-api-key').click()
      cy.getBySel('input-api-token-name').clear().type(token.name)
      if (token.expire_at)
        cy.getBySel('calendar-api-token-expiration_at')

      cy.getBySel('btn-submit-api-key-form').click()
      cy.contains('Credenciales creados correctamente')
    })
  })

  it('Eliminar token de acceso', () => {
    cy.contains('Eliminar').sample().click()
    cy.get('.el-popconfirm').contains('No').click()

    cy.contains('Eliminar').sample().click()
    cy.get('.el-popconfirm').contains('Si').click()

    cy.contains('Elemento eliminado correctamente')
  })
})
