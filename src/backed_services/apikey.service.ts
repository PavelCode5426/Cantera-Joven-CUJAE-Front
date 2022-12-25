import type { Filter } from '~/backed_services/service'
import AbstractService from '~/backed_services/service'
import type { PaginateResponse } from '~/globals/config/axios'
import type { ApikeyModel } from '~/backed_services/models/apikey.model'

export interface IApiKeyService {

}

export class ApikeyService extends AbstractService implements IApiKeyService {
  async list_apikey(filter: Filter): Promise<PaginateResponse<ApikeyModel>> {
    const call = this.callWithToken().get('/auth/api-key/', { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async delete_apikey(id: number): boolean {
    const call = this.callWithToken().delete(`/auth/api-key/${id}/`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async create_apikey(apikey: ApikeyModel): ApikeyModel {
    const call = this.callWithToken().post('/auth/api-key/', apikey)
    const response = await this.parseResponse(call)
    return response.data
  }
}

const AKeyService = new ApikeyService()
export default AKeyService
