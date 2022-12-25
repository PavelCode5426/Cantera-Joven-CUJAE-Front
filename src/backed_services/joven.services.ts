import AbstractService, { Filter, SimpleFilter } from '~/backed_services/service'
import type { PaginateResponse } from '~/globals/config/axios'
import type { EstudianteModel, GraduadoModel } from '~/backed_services/models/joven.model'

export class JovenFilter extends Filter {
  has_plan: boolean | undefined
  has_aval: boolean | undefined
  has_tutor: boolean | undefined
}

export interface IJovenService {

}

export class JovenService extends AbstractService implements IJovenService {
  async all_estudiantes(area_id: number, filter: JovenFilter | undefined): PaginateResponse<EstudianteModel[]> {
    const call = this.callWithToken().get(`area/${area_id}/estudiante`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_graduados(area_id: number, filter: JovenFilter | undefined): PaginateResponse<GraduadoModel[]> {
    const call = this.callWithToken().get(`area/${area_id}/graduados`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_jovenes(area_id: number, filter: JovenFilter | undefined): PaginateResponse<EstudianteModel[] | GraduadoModel[]> {
    const call = this.callWithToken().get(`area/${area_id}/jovenes`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }
}
const jovenService = new JovenService()
export default jovenService
