function login(username: string, password: string) {
  cy.apiRequest('POST', 'auth/login', { username, password }).then((response) => {
    const data = response.body
    const user = data.user

    const localStorage = {
      isAuthenticated: true,
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      area: user.area.nombre,
      token: data.token,
    }
    window.localStorage.setItem('auth', JSON.stringify(localStorage))
  })
}

function logout() {
  cy.apiRequest('POST', 'auth/logout').then((response) => {
    window.localStorage.removeItem('auth')
  })
}

export default { parent: { login, logout } }
