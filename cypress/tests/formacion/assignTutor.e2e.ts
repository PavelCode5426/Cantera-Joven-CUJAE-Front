describe('Comprobar la asignacion de tutores', () => {
  before(() => {
    cy.fixture('formacion/assignTutor.json').then(({ credentials }) => {
      cy.login(credentials.username, credentials.password)
      cy.visit(Cypress.env('ADMIN_URL'))
    })
    // })
    //
    // beforeEach('Comprobando la carga de graduados', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}area/graduados/sin-tutor`).as('data')

    cy.clickElements(['nav-item-formacion-complementaria', 'nav-item-fc-asignar-tutores'])
    cy.contains('Asignar Tutor')

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
            cy.wrap($element).contains('Asignar Tutores')
          }).its('length').should('equal', data.length)
      }
    })
  })

  it('Asignar un tutor aleatoriamente', () => {
    cy.get('[data-test=btn-assing-tutor]:not(.disabled)').sample().then((item) => {
      cy.wrap(item).click()
      cy.contains('Asignar Tutores')
      cy.contains('Cancelar').click()

      cy.wrap(item).click()

      cy.getBySel('combobox-select-tutors').click()
      cy.getBySel('combobox-select-tutors-option').sample().click()
      cy.get('.el-dialog').click()

      cy.get('.modal-footer button:last').click()
      cy.get('.el-popconfirm')
        .find('.el-popconfirm__action')
        .find('button:last').click()

      cy.contains('Tutores asignados correctamente')
    })
  })

  it('Asignar un tutor y area aleatoriamente', () => {
    cy.get('[data-test=btn-assing-tutor]:not(.disabled)').sample().then((item) => {
      cy.wrap(item).click()

      cy.getBySel('combobox-select-tutors').click()
      cy.getBySel('combobox-select-tutors-option').sample().click()
      cy.get('.el-dialog').click()

      cy.getBySel('combobox-select-areas').click()
      cy.getBySel('combobox-select-areas-option').sample().click()
      cy.get('.el-dialog').click()

      cy.get('.modal-footer button:last').click()
      cy.get('.el-popconfirm')
        .find('.el-popconfirm__action')
        .find('button:last').click()
      cy.contains('Tutores asignados correctamente')
    })
  })
})
