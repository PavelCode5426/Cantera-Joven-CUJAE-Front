import type { ServerError, ServerResponse } from '../globals/config/axios'
import { CallWithToken, CallWithoutToken, ParseResponse } from '../globals/config/axios'

export class AuthenticationService {
  public async login(username: string, password: string): Promise<ServerResponse | ServerError> {
    const call = CallWithoutToken().post('/auth/login', { username, password })
    const response = await ParseResponse(call)
    return response
  }

  public async logout(): Promise<ServerResponse | ServerError> {
    const call = CallWithToken().post('/auth/logout')
    const response = await ParseResponse(call)
    return response
  }

  public async listApiKeys(): Promise<ServerResponse | ServerError> {
    const call = CallWithToken().get('/auth/api-key/')
    const response = await ParseResponse(call)
    return response
  }

  public async createApiKey(name: string, expired_at: string | undefined): Promise<ServerResponse | ServerError> {
    const call = CallWithToken().post('/auth/api-key/', { name, expired_at })
    const response = await ParseResponse(call)
    return response
  }

  public async deleteApiKey(id: number): Promise<ServerResponse | ServerError> {
    const call = CallWithToken().delete(`/auth/api-key/${id}/`)
    const response = await ParseResponse(call)
    return response
  }
}

const authServiceInstace = new AuthenticationService()
export default authServiceInstace
