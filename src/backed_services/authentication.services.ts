import AbstractService from '~/backed_services/service'
import type { AuthUserModel } from '~/backed_services/models/user.model'

export interface IAuthenticationService {
  // login(username: string, password: string): any
  // logout(): void
}

export class AuthenticationServices extends AbstractService implements IAuthenticationService {
  async login(username: string, password: string): { token: string; user: AuthUserModel } {
    const call = this.callWithoutToken().post('/auth/login', { username, password })
    const response = await this.parseResponse(call)
    return response.data
  }

  async logout(): void {
    const call = this.callWithToken().post('/auth/logout')
    const response = await this.parseResponse(call)
  }
}

const AuthServices = new AuthenticationServices()
export default AuthServices
