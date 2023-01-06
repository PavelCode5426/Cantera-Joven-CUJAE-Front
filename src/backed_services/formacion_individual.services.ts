import AbstractService, { Filter, Paginate } from '~/backed_services/service'
import type { PaginateResponse } from '~/globals/config/axios'
import type {
  ActividadFormacionModel,
  DimensionModel,
  EstadoActividadFormacion,
  EstadoPlanFormacion,
  EtapaFormacionModel,
  EvaluacionFinalModel,
  EvaluacionFormacionModel, PlanFormacionModel,
  PropuestaMovimientoModel,
} from '~/backed_services/models/formacion_individual.model'
import type ArchivoModel from '~/backed_services/models/archivo.model'

export interface IFormacionIndividualServices {}

export class SignPlanFormacion {
  sign: boolean
  file: any | null

  constructor(sign: boolean, file: any = null) {
    this.sign = sign
    this.file = file
  }
}

export class EvaluacionFilter extends Filter {
  pendiente: boolean | undefined
  esSatisfactorio: boolean | undefined
}

export class PlanFormacionFilter extends Filter {
  estado: EstadoPlanFormacion
}

export class FormacionIndividualServices extends AbstractService implements IFormacionIndividualServices {
  async list_planes_formacion_from_area(area_id: number, filter: Filter): PaginateResponse<PlanFormacionModel> {
    const call = this.callWithToken().get(`/area/${area_id}/planes`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async list_planes_formacion_from_tutor(tutor_id: number, filter: Filter): PaginateResponse<PlanFormacionModel> {
    const call = this.callWithToken().get(`/tutor/${tutor_id}/planes`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async list_planes_formacion_from_joven(joven_id: number, filter: Filter): PaginateResponse<PlanFormacionModel> {
    const call = this.callWithToken().get(`/joven/${joven_id}/planes`, { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async create_plan_formacion_from_joven(joven_id: number): PlanFormacionModel {
    const call = this.callWithToken().post(`joven/${joven_id}/plan-individual`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async retrieve_plan_formacion_from_joven(joven_id: number): PlanFormacionModel {
    const call = this.callWithToken().get(`joven/${joven_id}/plan-individual`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async retrieve_plan_formacion(plan_id: number): PlanFormacionModel {
    const call = this.callWithToken().get(`/plan-individual/${plan_id}`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async list_versiones_plan_formacion(plan_id: number, paginate: Paginate): PaginateResponse<ArchivoModel> {
    const call = this.callWithToken().get(`/plan-individual/${plan_id}/versiones`, { params: paginate })
    const response = await this.parseResponse(call)
    return response.data
  }

  async change_status_plan_formacion(plan_id: number, estado: EstadoPlanFormacion) {
    const call = this.callWithToken().put(`/plan-individual/${plan_id}`, { estado })
    const response = await this.parseResponse(call)
    return response.data
  }

  async sign_plan_formacion(plan_id: number, firma: SignPlanFormacion) {
    const data = new FormData()
    data.append('sign', firma.sign)
    if (firma.file)
      data.append('file', firma.file)

    const axios = this.callWithToken()
    const call = axios.post(`/plan-individual/${plan_id}/firmar`, data, {
      headers: {
        ...axios.defaults.headers.common,
        'Content-Type': 'multipart/form-data',
      },
    })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_etapas_formacion_from_plan(plan_id: number): EtapaFormacionModel[] {
    const list: EtapaFormacionModel[] = []
    const filter = new Filter(1, 100)
    let call = this.callWithToken().get(`plan-individual/${plan_id}/etapas`, { params: filter })
    let response: PaginateResponse<EtapaFormacionModel> = await this.parseResponse(call)
    list.push(...response.data.results)

    while (response.next) {
      filter.page++
      call = this.callWithToken().get(`plan-individual/${plan_id}/etapas`, { params: filter })
      response = await this.parseResponse(call)
      list.push(...response.data.results)
    }

    return list
  }

  async retrieve_etapa_formacion(etapa_id: number): EtapaFormacionModel {
    const call = this.callWithToken().get(`etapa-formacion/${etapa_id}`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async update_etapa_formacion(etapa_id: number, etapa: EtapaFormacionModel) {
    const call = this.callWithToken().put(`etapa-formacion/${etapa_id}`, { ...etapa })
    const response = await this.parseResponse(call)
    return response.data
  }

  /**
   *  GESTION DE DIMENSIONES
   */

  async all_dimensiones(): DimensionModel[] {
    const list: DimensionModel[] = []
    const paginate = new Paginate(1, 100)
    let response = await this.list_dimensiones(paginate)
    list.push(...response.results)

    while (response.next) {
      filter.page++
      response = await this.this.list_dimensiones(filter)
      list.push(...response.results)
    }

    return list
  }

  async list_dimensiones(filter: Paginate): PaginateResponse<DimensionModel> {
    const call = this.callWithToken().get('dimension/', { params: filter })
    const response: PaginateResponse<DimensionModel> = await this.parseResponse(call)
    return response.data
  }

  async update_dimension(id: number, dimension: DimensionModel): DimensionModel {
    const call = this.callWithToken().put(`dimension/${id}/`, dimension)
    const response: DimensionModel = await this.parseResponse(call)
    return response.data
  }

  async create_dimension(dimension: DimensionModel): DimensionModel {
    const call = this.callWithToken().post('dimension/', dimension)
    const response: DimensionModel = await this.parseResponse(call)
    return response.data
  }

  async delete_dimension(id: number) {
    const call = this.callWithToken().delete(`dimension/${id}/`)
    const response: DimensionModel = await this.parseResponse(call)
    return response.data
  }

  // TODO FALTA PONER LAS COSAS DE DIMENSIONES
  /**
   *  GESTION DE ACTIVIDADES
   */

  async all_actividades_formacion_from_etapa(etapa_id: number): ActividadFormacionModel[] {
    const filter = new Paginate(1, 100)
    const call = this.callWithToken().get(`etapa-formacion/${etapa_id}/actividades`, { params: filter })
    const response = await this.parseResponse(call)
    const list = [...response.data.results]

    while (response.next) {
      filter.page++
      const call = this.callWithToken().get(`etapa-formacion/${etapa_id}/actividades`, { params: filter })
      const response = await this.parseResponse(call)
      list.push(...response.data.results)
    }

    return list
  }

  async all_subactividades_from_actividad_formacion(actividad_padre_id: number): ActividadFormacionModel[] {
    const filter = new Paginate(1, 100)
    let call = this.callWithToken().get(`actividad-formacion/${actividad_padre_id}/subactividades`, { params: filter })
    const response = await this.parseResponse(call)
    const list = [...response.data.results]

    while (response.next) {
      filter.page++
      call = this.callWithToken().get(`actividad-formacion/${actividad_padre_id}/subactividades`, { params: filter })
      const response = await this.parseResponse(call)
      list.push(...response.data.results)
    }

    return list
  }

  async create_actividad_formacion(etapa_id: number, actividad: ActividadFormacionModel): ActividadFormacionModel {
    const call = this.callWithToken().post(`etapa-formacion/${etapa_id}/actividades`, actividad)
    const response = await this.parseResponse(call)
    return response.data
  }

  async create_subactividad_formacion(actividad_padre_id: number, actividad: ActividadFormacionModel): ActividadFormacionModel {
    const call = this.callWithToken().post(`actividad-formacion/${actividad_padre_id}/subactividades`, actividad)
    const response = await this.parseResponse(call)
    return response.data
  }

  async update_actividad_formacion(actividad_id: number, actividad: ActividadFormacionModel): ActividadFormacionModel {
    const call = this.callWithToken().put(`actividad-formacion/${actividad_id}`, actividad)
    const response = await this.parseResponse(call)
    return response.data
  }

  async delete_actividad_formacion(actividad_id: number) {
    const call = this.callWithToken().delete(`actividad-formacion/${actividad_id}`)
    const response = await this.parseResponse(call)
  }

  async retrieve_actividad_formacion(actividad_id: number): ActividadFormacionModel {
    const call = this.callWithToken().get(`actividad-formacion/${actividad_id}`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async request_review_actividad_formacion(actividad_id: number) {
    const call = this.callWithToken().post(`actividad-formacion/${actividad_id}/solicitar-revision`)
    const response = await this.parseResponse(call)
  }

  async change_status_actividad_formacion(actividad_id: number, estado: EstadoActividadFormacion) {
    const call = this.callWithToken().patch(`actividad-formacion/${actividad_id}`, { estado })
    const response = await this.parseResponse(call)
    return response.data
  }

  /**
   *  GESTION DE ARCHIVOS
   */

  async delete_archivo(archivo_id: number) {
    const call = this.callWithToken().delete(`archivo/${archivo_id}/`)
    const response = await this.parseResponse(call)
  }

  /**
   *  GESTION DE EVALUACIONES
   */

  async list_evaluaciones(filter: EvaluacionFilter): PaginateResponse<EvaluacionFormacionModel | EvaluacionFinalModel> {
    const call = this.callWithToken().get('evaluacion/', { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async retrieve_evaluaciones(evaluacion_id: number): EvaluacionFinalModel | EvaluacionFormacionModel {
    const call = this.callWithToken().get(`evaluacion/${evaluacion_id}`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async evaluar_etapa_formacion(etapa_id: number, evaluacion: EvaluacionFormacionModel): EvaluacionFormacionModel {
    const call = this.callWithToken().post(`etapa-formacion/${etapa_id}/evaluar`, evaluacion)
    const response = await this.parseResponse(call)
    return response.data
  }

  async evaluar_plan_individual(plan_id: number, evaluacion: EvaluacionFinalModel): EvaluacionFinalModel {
    const call = this.callWithToken().post(`plan-individual/${plan_id}/evaluar`, evaluacion)
    const response = await this.parseResponse(call)
    return response.data
  }

  async aprobar_evaluacion_formacion(evaluacion_id: number) {
    const call = this.callWithToken().post(`evaluacion-formacion/${evaluacion_id}/aprobar`)
    const response = await this.parseResponse(call)
    return response.data
  }

  /**
   * GESTION DE PROPUESTAS DE MOVIMIENTO
   */

  async list_propuestas_movimiento(filter: Paginate): PaginateResponse<PropuestaMovimientoModel> {
    const call = this.callWithToken().get('propuesta-movimiento/', { params: filter })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_propuestas_movimiento(): PropuestaMovimientoModel[] {
    const filter = new Paginate(1, 100)
    let response = await this.list_propuestas_movimiento(filter)
    const list = [...response.results]

    while (response.next) {
      filter.page++
      response = await this.list_propuestas_movimiento(filter)
      list.push(...response.results)
    }

    return list
  }

  async retrieve_propuesta_movimiento(propuesta_id: number): PropuestaMovimientoModel {
    const call = this.callWithToken().get(`propuesta-movimiento/${propuesta_id}`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async create_propuestas_movimiento(propuesta: PropuestaMovimientoModel): PropuestaMovimientoModel {
    const call = this.callWithToken().post('propuesta-movimiento/', propuesta)
    const response = await this.parseResponse(call)
    return response.data
  }

  async update_propuestas_movimiento(propuesta_id: number, propuesta: PropuestaMovimientoModel): PropuestaMovimientoModel {
    const call = this.callWithToken().put(`propuesta-movimiento/${propuesta_id}/`, propuesta)
    const response = await this.parseResponse(call)
    return response.data
  }

  async delete_propuestas_movimiento(propuesta_id: number) {
    const call = this.callWithToken().delete(`propuesta-movimiento/${propuesta_id}/`)
    const response = await this.parseResponse(call)
    return response.data
  }
}

const FIndivServices = new FormacionIndividualServices()
export default FIndivServices
