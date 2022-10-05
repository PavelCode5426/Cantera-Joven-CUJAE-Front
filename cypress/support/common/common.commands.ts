const getBySel = (selector: string, ...args: any) => {
  return cy.get(`[data-test=${selector}]`, ...args)
}

const getBySelLike = (selector: string, ...args: any) => {
  return cy.get(`[data-test*=${selector}]`, ...args)
}

const apiRequest = (method: string, url: string, body: any = {}) => {
  const authStore = JSON.parse(window.localStorage.getItem('auth'))

  const requestOptions = {
    method,
    url: Cypress.env('API_URL') + url,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }

  if (authStore)
    requestOptions.headers.Authorization = `Bearer ${authStore.token}`

  return cy.request(requestOptions)
}

const clickElements = (selectors: string[], ...args: any) => {
  const items = [...selectors]
  let element = cy.getBySel(items.shift(), ...args).hover().click()
  selectors.forEach((item) => {
    element = element.getBySel(item, ...args).hover().click()
  })
  return element
}

const haveClass = (subject: any, classesList: string[]): boolean => {
  let is = false
  cy.wrap(subject).invoke('attr', 'class').then((classes: string) => {
    while (classesList.length && !is)
      is = classes.includes(classesList.shift())
  })
  return cy.wrap(is)
}

const apiIntercept = (method: string, url: string) => {
  const authStore = JSON.parse(window.localStorage.getItem('auth'))

  const requestOptions = {
    method,
    url: Cypress.env('API_URL') + url,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (authStore)
    requestOptions.headers.Authorization = `Bearer ${authStore.token}`

  return cy.intercept(requestOptions)
}

const sample = (subject: any) => {
  return Cypress._.sample(subject.toArray())
}

const hover = (subject: any) => {
  return subject.trigger('mouseover')
}

export default {
  parent: { getBySel, getBySelLike, apiRequest, clickElements },
  child: { haveClass, sample, hover },
  dual: {},
}
