function apiLogs() {
  return cy.apiRequest('GET', 'usuario/logs')
}

export default {
  parent: { apiLogs },
}
