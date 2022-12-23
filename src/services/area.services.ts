import { CallWithToken, ParseResponse, ServerResponse } from '~/globals/config/axios'
import type AreaModel from '~/services/models/area.model'

export class AreaServices {
  public async listAll() {
    const call = CallWithToken().get('area/')
    const response = await ParseResponse(call)
    if (response instanceof ServerResponse && response.httpCode == 200)
      response.data = response.data as AreaModel[]
    return response
  }
}

const AreaServicesInstance = new AreaServices()
export default AreaServicesInstance

