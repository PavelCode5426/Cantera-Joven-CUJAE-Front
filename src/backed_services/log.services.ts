import AbstractService from '~/backed_services/service'
import type { PaginateResponse } from '~/globals/config/axios'
import type LogModel from '~/backed_services/models/log.model'

export interface ILogServices {

}

export class LogServices extends AbstractService implements ILogServices {
  async all_user_logs(page = 1): Promise<PaginateResponse<LogModel>> {
    const call = this.callWithToken().get('/usuario/logs', { params: { page } })
    const response = await this.parseResponse(call)
    return response.data
  }
}

const LogService = new LogServices()
export default LogService
