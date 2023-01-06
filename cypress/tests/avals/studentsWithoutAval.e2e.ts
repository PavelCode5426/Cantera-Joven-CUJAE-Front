describe('Comprobar la gestion de los avales', () => {
  before(() => {
    cy.fixture('manage/aval.json').then(({ credentials }) => {
      cy.login(credentials.username, credentials.password)
      cy.visit(Cypress.env('ADMIN_URL'))
    })
  })

  beforeEach('Comprobando la carga de estudiantes', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}area/estudiantes`).as('data')

    cy.clickElements(['nav-item-cantera', 'nav-item-reportes', 'nav-item-estudiantes-sin-aval'])
    cy.contains('Listado de Estudiantes')

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
            cy.wrap($element).contains(student.anno_academico)

            if (student.aval) {
              cy.wrap($element).contains('Aval')
              cy.wrap($element).contains('Editar Aval')
            }
            else {
              cy.wrap($element).contains('Sin Aval')
              cy.wrap($element).contains('Crear Aval')
            }
          }).its('length').should('equal', data.length)
      }
    })
  })
})
