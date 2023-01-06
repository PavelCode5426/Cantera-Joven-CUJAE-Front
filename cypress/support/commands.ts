/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// Object.values(import.meta.globEager('./cypress/**/*.commands.ts')).forEach((item: any) => {
//   Cypress.Commands.addAll({ ...item })
// })

// import { login } from '../authentication/authentication.commands'
// import { getBySel, getBySelLike } from '../commands/common.commands'

// Cypress.Commands.add('login', login)
// Cypress.Commands.add('getBySel', getBySel)
// Cypress.Commands.add('getBySelLike', getBySelLike)

import authentication from '../tests/authentication/authentication.commands'
import configuration from '../tests/configuration/configuration.commands'
import common from './common/common.commands'
import logs from './../tests/logs/logs.commands'

const commandsToRegister = [authentication, common, configuration, logs]

function installCommands(installers) {
  installers.forEach((commandIntaller) => {
    const types = Object.keys(commandIntaller)

    types.forEach((type) => {
      let prevSubject: string | boolean = false

      if (type === 'child')
        prevSubject = true
      else if (type === 'dual')
        prevSubject = 'optional'

      Cypress.Commands.addAll({ prevSubject }, { ...commandIntaller[type] })
    })
  })
}

installCommands(commandsToRegister)
