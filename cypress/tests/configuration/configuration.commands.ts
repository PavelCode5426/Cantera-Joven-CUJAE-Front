import { CommandInstaller } from '../../support/types'

const apiConfig = () => {
  return cy.apiRequest('GET', 'config')
}

export default {
  parent: { apiConfig },
  // child: {},
  // dual: {},
}
