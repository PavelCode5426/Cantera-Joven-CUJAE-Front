describe('Comprobar la preasignacion de areas', () => {
  before(() => {
    cy.fixture('familiarizacion/assignArea.json').then(({ credentials }) => {
      cy.login(credentials.username, credentials.password)
      cy.visit(Cypress.env('ADMIN_URL'))
    })
  })

  beforeEach('Comprobando la carga de estudiantes', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}posible-graduado/no-preubicado`).as('data')

    cy.clickElements(['nav-item-familiarizacion', 'nav-item-f-asignar-areas'])
    cy.contains('Asignar Areas')

    cy.wait('@data').its('response.statusCode').should('eq', 200)
    cy.get('@data').then(({ response }) => {
      const data = response.body

      if (!data.length) { cy.contains('Sin Datos') }
      else {
        cy.get('table')
          .find('tbody')
          .find('tr')
          .each(($element, index) => {
            const student = data[index]

            cy.wrap($element).contains(`${student.first_name} ${student.last_name}`)
            cy.wrap($element).contains(student.email)
            cy.wrap($element).contains('Asignar Area')
          }).its('length').should('equal', data.length)
      }
    })
  })

  it('Asignar un area aleatoriamente', () => {
    cy.getBySel('btn-assing-area').sample().click()
    cy.getBySel('modal-assing-area-form')
  })
})
