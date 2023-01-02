import type { Paginate } from '~/backed_services/service'
import AbstractService from '~/backed_services/service'
import type { PaginateResponse } from '~/globals/config/axios'
import type ComentarioModel from '~/backed_services/models/comentario.model'

export interface IComentarioSerives {

}

export class ComentarioService extends AbstractService implements IComentarioSerives {
  async list_comentarios_from_plan_individual(plan_id: id, paginate: Paginate): Promise<PaginateResponse<ComentarioModel>> {
    const call = this.callWithToken().get(`plan-individual/${plan_id}/comentarios`, { params: paginate })
    const response = await this.parseResponse(call)
    return response.data
  }

  async add_comentario_to_plan_individual(plan_id: id, texto: string): Promise<ComentarioModel> {
    const call = this.callWithToken().post(`plan-individual/${plan_id}/comentarios`, { texto })
    const response = await this.parseResponse(call)
    return response.data
  }

  async list_comentarios_from_plan_colectivo(plan_id: id, paginate: Paginate): Promise<PaginateResponse<ComentarioModel>> {
    const call = this.callWithToken().get(`plan-colectivo/${plan_id}/comentarios`, { params: paginate })
    const response = await this.parseResponse(call)
    return response.data
  }

  async list_comentarios_from_actividad_formacion(actividad_id: id, paginate: Paginate): Promise<PaginateResponse<ComentarioModel>> {
    const call = this.callWithToken().get(`actividad-formacion/${actividad_id}/comentarios`, { params: paginate })
    const response = await this.parseResponse(call)
    return response.data
  }

  async add_comentario_to_actividad_individual(actividad_id: id, texto: string): Promise<ComentarioModel> {
    const call = this.callWithToken().post(`actividad-formacion/${actividad_id}/comentarios`, { texto })
    const response = await this.parseResponse(call)
    return response.data
  }
}

const comentarioService = new ComentarioService()
export default comentarioService
