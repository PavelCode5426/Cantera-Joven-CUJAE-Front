let username: any, password: any, submit: any

function loadElements() {
  username = cy.get('input[name=\'username\']').first()
  password = cy.get('input[name=\'password\']').last()
  submit = cy.get('button.btn-login').first()
}
function signIn(user: string, pass: string, options: { isLoading: boolean;contain: string } = { isLoading: false, contain: 'Credenciales Incorrectos' }) {
  username.clear().type(user)
  password.clear().type(pass)
  submit.click()

  if (options.isLoading)
    submit.get('i.loading')

  cy.contains(options.contain)
}
function visitPage() {
  cy.visit('/')
  cy.get('#form_login')
}

describe('Probando la autenticacion en el sistema', () => {
  beforeEach(() => {
    visitPage()
    loadElements()
    cy.fixture('credentials.json').as('data')
  })

  it('Comprobar credenciales incorrectos', () => {
    cy.get('@data').then((data) => {
      data.invalid.forEach(item => signIn(item.username, item.password))
    })
  })

  it('Comprobar credenciales validos', () => {
    cy.get('@data').then((data) => {
      data.valid.forEach((item) => {
        signIn(item.username, item.password, { contain: 'Cerrar Sesion' })
        cy.url().should('include', '/admin').wait(1000)
      })
    })
  })
})
