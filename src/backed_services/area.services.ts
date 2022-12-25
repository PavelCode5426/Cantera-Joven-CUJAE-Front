import AbstractService from '~/backed_services/service'
import type AreaModel from '~/backed_services/models/area.model'
import type { PaginateResponse } from '~/globals/config/axios'

interface IAreaServices {

}

class AreaServices extends AbstractService implements IAreaServices {
  async all_areas(): Promise<PaginateResponse<AreaModel>> {
    const call = this.callWithToken().get('/area/')
    const response = await this.parseResponse(call)
    return response.data
  }
}

const AreaService = new AreaServices()
export default AreaService
