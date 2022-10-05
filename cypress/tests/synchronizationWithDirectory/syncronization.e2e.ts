const btnImport = 'btn-import-data'
let fixtureJson = 'syncronization/students.json'
let navItems = ['nav-item-cantera', 'nav-item-c-conformar']

function beforeAll(fixture: string) {
  cy.fixture(fixture).then(({ credentials }) => {
    cy.login(credentials.username, credentials.password)
    cy.url().then((url) => {
      if (!url.includes('admin'))
        cy.visit(Cypress.env('ADMIN_URL'))
    })
  })
}
function beforeEachAll() {
  cy.intercept('GET', `${Cypress.env('API_URL')}directorio/*`).as('data')
  cy.clickElements(navItems)
  cy.contains('Conformar')
  cy.getBySel(btnImport)// .haveClass(['disabled']).should('eq', true)
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

          cy.wrap($element).contains(student.email)
          cy.wrap($element).contains(student.first_name)
          cy.wrap($element).contains(student.last_name)
        }).its('length').should('equal', data.length)
    }
  })
}

describe('Comprobar la sincronizacion del sistema con los estudiantes del directorio', () => {
  before(() => beforeAll(fixtureJson))
  beforeEach(beforeEachAll)
  afterEach(() => {
    cy.reload()
  })

  it('Importar estudiante aleatoriamente', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('.el-checkbox:not(:first,.is-disabled)').sample().click()

        cy.getBySel(btnImport)// .haveClass(['disabled']).should('eq', false)
        cy.getBySel(btnImport).click()

        cy.contains('Importados Correctamente')
      }
    })
  })

  it('Importar estudiante utilizando boton', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('table tbody tr button:first').sample().click()

        cy.get('.el-popconfirm')
          .find('.el-popconfirm__action')
          .find('button:last').click()

        cy.contains('Importado Correctamente')
      }
    })
  })

  it('Importar todos los estudiantes', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('.el-checkbox:first').click()

        cy.getBySel(btnImport).haveClass(['disabled']).should('eq', false)
        cy.getBySel(btnImport).click()

        cy.contains('Importados Correctamente')
      }
    })
  })
})

describe('Comprobar la sincronizacion del sistema con los posibles graduados del directorio', () => {
  before(() => {
    fixtureJson = 'syncronization/pgraduates.json'
    navItems = ['nav-item-familiarizacion', 'nav-item-f-conformar']
    beforeAll(fixtureJson)
  })

  beforeEach(beforeEachAll)
  afterEach(() => {
    cy.reload()
  })

  it('Importar posibles graduados aleatoriamente', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('.el-checkbox:not(:first,.is-disabled)').sample().click()

        cy.getBySel(btnImport)// .haveClass(['disabled']).should('eq', false)
        cy.getBySel(btnImport).click()

        cy.contains('Importados Correctamente')
      }
    })
  })

  it('Importar posibles graduados utilizando boton', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('table tbody tr button:first').sample().click()

        cy.get('.el-popconfirm')
          .find('.el-popconfirm__action')
          .find('button:last').click()

        cy.contains('Importado Correctamente')
      }
    })
  })

  it('Importar todos los posibles graduados', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('.el-checkbox:first').click()

        cy.getBySel(btnImport).haveClass(['disabled']).should('eq', false)
        cy.getBySel(btnImport).click()

        cy.contains('Importados Correctamente')
      }
    })
  })
})

describe('Comprobar la sincronizacion del sistema con los graduados del directorio', () => {
  before(() => {
    fixtureJson = 'syncronization/pgraduates.json'
    navItems = ['nav-item-formacion-complementaria', 'nav-item-fc-conformar']
    beforeAll(fixtureJson)
  })

  beforeEach(beforeEachAll)
  afterEach(() => {
    cy.reload()
  })

  it('Importar graduados aleatoriamente', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('.el-checkbox:not(:first,.is-disabled)').sample().click()

        cy.getBySel(btnImport)// .haveClass(['disabled']).should('eq', false)
        cy.getBySel(btnImport).click()

        cy.contains('Importados Correctamente')
      }
    })
  })

  it('Importar graduados utilizando boton', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('table tbody tr button:first').sample().click()

        cy.get('.el-popconfirm')
          .find('.el-popconfirm__action')
          .find('button:last').click()

        cy.contains('Importado Correctamente')
      }
    })
  })

  it('Importar todos los graduados', () => {
    cy.get('@data').then(({ response }) => {
      const data = response.body
      if (data.length) {
        cy.get('.el-checkbox:first').click()

        cy.getBySel(btnImport).haveClass(['disabled']).should('eq', false)
        cy.getBySel(btnImport).click()

        cy.contains('Importados Correctamente')
      }
    })
  })
})
