describe('Comprobar carga de registros del sistema', () => {
  before(() => {
    cy.fixture('log.json').then(({ credentials }) => {
      cy.login(credentials.username, credentials.password)
      cy.visit(Cypress.env('ADMIN_URL'))
    }).as('logData')
  })

  it('Comprobar la carga de la pagina de registro', () => {
    cy.clickElements(['nav-item-ajustes', 'nav-item-registros'])
    cy.contains('Historial de Acciones en el Sistema')
  })

  it('Comprobar que los registros mostrados sean correctos', () => {
    cy.apiLogs().then((response) => {
      const logs: object[] = response.body

      cy.get('tr.el-table__row').then((rows) => {
        cy.wrap(logs.length).should('equal', rows.length)
      })
    })
  })
})
