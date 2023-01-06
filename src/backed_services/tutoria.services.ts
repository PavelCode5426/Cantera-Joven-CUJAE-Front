import AbstractService, { Filter } from '~/backed_services/service'
import type { PaginateResponse } from '~/globals/config/axios'
import type UserModel from '~/backed_services/models/user.model'
import type { SolicitudTutorModel, TutorAsignadoModel, TutoradoAsignadoModel } from '~/backed_services/models/tutorial.model'

export class TutoriaFilter extends Filter {
  revocado: boolean | undefined
  has_aval: boolean | undefined
  has_plan: boolean | undefined
}

export class SolicitudTutoriaFilter extends Filter {
  is_pendiente: boolean | undefined
  is_enviada: boolean | undefined
}

export interface ITutoriaServices {

}

export class SolicitudTutorExterno {
  area: number
  motivo_solicitud: string
}

export class AsignarSolicitarTutor {
  tutores: number[]
  solicitudes: SolicitudTutorExterno[]
}

export class RespuestaSolicitud {
  tutores: number[]
  motivo_respuesta: string
}

export class TutoriaServices extends AbstractService implements ITutoriaServices {
  async all_tutors_in_area(area_id: number, filter: Filter): PaginateResponse<UserModel> {
    const call = this.callWithToken().get(`area/${area_id}/tutores`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_tutorados_from_tutor(tutor_id: number, filter: TutoriaFilter): PaginateResponse<TutoradoAsignadoModel> {
    const call = this.callWithToken().get(`tutor/${tutor_id}/tutorados`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_tutores_from_joven(tutor_id: number, filter: TutoriaFilter): PaginateResponse<TutorAsignadoModel> {
    const call = this.callWithToken().get(`joven/${tutor_id}/tutores`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async asignar_tutores(joven_id: number, asignaciones: AsignarSolicitarTutor) {
    const call = this.callWithToken().post(`joven/${joven_id}/asignar-solicitar`, asignaciones)
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_solicitudes(area_id: number, filter: SolicitudTutoriaFilter): PaginateResponse<SolicitudTutorModel> {
    const call = this.callWithToken().get(`area/${area_id}/solicitud-tutor`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async retrieve_solicitud(solicitud_id: number): SolicitudTutorModel {
    const call = this.callWithToken().get(`solicitud-tutor/${solicitud_id}`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async responder_solicitud(solicitud_id: number, respuesta: RespuestaSolicitud) {
    const call = this.callWithToken().post(`solicitud-tutor/${solicitud_id}`, respuesta)
    const response = await this.parseResponse(call)
    return response.data
  }
}

const tutoriaServices = new TutoriaServices()
export default tutoriaServices
