describe('Comprobar la configuration', () => {
  before(() => {
    cy.login('pperez', '1234')
    cy.visit(Cypress.env('ADMIN_URL'))
  })

  let configs

  it('Comprobar la carga de la pagina de configuracion', () => {
    cy.getBySel('nav-item-ajustes').click().then((elem) => {
      cy.getBySel('nav-item-config').click()
      cy.contains('Configuraciones del Sistema')
      cy.apiConfig().then((response) => {
        configs = response.body
      })
    })
  })

  it('Comprobar que se cargaron todos los elementos de configuracion', () => {
    Object.keys(configs).forEach((item) => {
      cy.getBySel(`title_${item}`).getBySel(`value_${item}`)
    })
  })

  it('Cambiar valor de elementos', () => {
    const item = Object.keys(configs).pop()
    cy.getBySel(`value_${item}`).click()

    cy.getBySel('submit-config').click()
    cy.get('.el-message-box .el-message-box__btns .el-button:first').click()// BOTON CANCELAR

    cy.getBySel('submit-config').click()
    cy.get('.el-message-box .el-message-box__btns .el-button:last').click()// BOTON ACEPTAR

    cy.contains('Configuracion Guardada Correctamente')

    cy.apiConfig().then((response) => {
      cy.wrap(configs[item]).should('not.equal', response.body[item])
      configs = response.body
    })
  })
})
