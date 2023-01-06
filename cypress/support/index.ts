// load type definitions that come with Cypress module
/// <reference types="cypress" />
import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string, ...args: any): Chainable<any>
      getBySelLike(selector: string, ...args: any): Chainable<any>
      apiRequest(method: string, url: string, body: any = {}): Chainable<any>
      clickElements(selectors: string[], ...args: any): Chainable<any>
      haveClass(subject: any, classesList: string[]): Chainable<boolean>
      apiIntercept(method: string, url: string): Chainable<any>
      sample(subject: any): Chainable<any>
      hover(subject: any): Chainable<any>

      // AUTHENTICATION
      login(username: string, password: string): Chainable<void>
      logout(): Chainable<void>

      // CONFIGURATION
      apiConfig(): Chainable<any>

      // LOGS
      apiLogs(): Chainable<any>
    }
  }
}
