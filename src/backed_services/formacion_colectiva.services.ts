import AbstractService, { Filter } from '~/backed_services/service'
import type { PaginateResponse } from '~/globals/config/axios'
import type {
    PlanFormacionColectivaModel, ActividadFormacionColectivaModel, EstadoPlanFormacion, EtapaFormacionModel, DimensionModel
} from '~/backed_services/models/formacion_colectiva.model'
import {PlanFormacionModel} from "~/backed_services/models/formacion_individual.model";

export interface IFormacionColectivaServices {}

export class SignPlanFormacionColectiva {
    sign: boolean
    file: any | null

    constructor(sign: boolean, file: any = null) {
        this.sign = sign
        this.file = file
    }
}


export class FormacionColectivaServices extends AbstractService implements IFormacionColectivaServices {
    //PLAN
    async all_planes_formacion(filter: Filter): PaginateResponse<PlanFormacionColectivaModelModel> {
        const call = this.callWithToken().get(`/plan-colectivo`, { params: filter })
        const response = await this.parseResponse(call)
        return response.data
    }

    async retrieve_plan_formacion_colectiva(plan_id: number): PlanFormacionColectivaModel {
        const call = this.callWithToken().get(`/plan-colectivo/${plan_id}`)
        const response = await this.parseResponse(call)
        return response.data
    }

    async retrieve_plan_formacion_from_joven(joven_id: number): PlanFormacionColectivaModel {
        const call = this.callWithToken().get(`/joven/${joven_id}/plan-colectivo`)
        const response = await this.parseResponse(call)
        return response.data
    }

    async create_plan_formacion(): PlanFormacionColectivaModel {
        const call = this.callWithToken().post(`/plan-colectivo/`)
        const response = await this.parseResponse(call)
        return response.data
    }

    async change_status_plan_formacion(plan_id: number, estado: EstadoPlanFormacion) {
        const call = this.callWithToken().put(`/plan-colectivo/${plan_id}`, { estado })
        const response = await this.parseResponse(call)
        return response.data
    }

    async sign_plan_formacion(plan_id: number, firma: SignPlanFormacionColectiva) {
        const data = new FormData()
        data.append('sign', firma.sign)
        if (firma.file)
            data.append('file', firma.file)

        const axios = this.callWithToken()
        const call = axios.post(`/plan-colectivo/${plan_id}/firmar`, data, {
            headers: {
                ...axios.defaults.headers.common,
                'Content-Type': 'multipart/form-data',
            },
        })
        const response = await this.parseResponse(call)
        return response.data
    }
    //ETAPAS
    async all_etapas_formacion_from_plan(plan_id: number): EtapaFormacionModel[] {
        const list: EtapaFormacionModel[] = []
        const filter = new Filter(1, 100)
        let call = this.callWithToken().get(`plan-colectivo/${plan_id}/etapas`, { params: filter })
        let response: PaginateResponse<EtapaFormacionModel> = await this.parseResponse(call)
        list.push(...response.data.results)

        while (response.next) {
            filter.page++
            call = this.callWithToken().get(`plan-colectivo/${plan_id}/etapas`, { params: filter })
            response = await this.parseResponse(call)
            list.push(...response.data.results)
        }

        return list
    }

    async retrieve_etapa(etapa_id: number): EtapaFormacionModel {
        const call = this.callWithToken().get(`etapa/${etapa_id}`)
        const response = await this.parseResponse(call)
        return response.data
    }

    async update_etapa(etapa_id: number, etapa: EtapaFormacionModel) {
        const call = this.callWithToken().put(`etapa/${etapa_id}`, { ...etapa })
        const response = await this.parseResponse(call)
        return response.data
    }
    //ACTIVIDADES GENERALES
    async all_actividades_generales_from_etapa(etapa_id: number): ActividadFormacionColectivaModel[] {
        const filter = new Filter(1, 100)
        const call = this.callWithToken().get(`etapa/${etapa_id}/actividades`, { params: filter })
        const response = await this.parseResponse(call)
        const list = [...response.data.results]

        while (response.next) {
            filter.page++
            const call = this.callWithToken().get(`etapa/${etapa_id}/actividades`, { params: filter })
            const response = await this.parseResponse(call)
            list.push(...response.data.results)
        }

        return list
    }

    async create_actividad_general(etapa_id: number, actividad: ActividadFormacionColectivaModel): ActividadFormacionColectivaModel {
        const call = this.callWithToken().post(`etapa/${etapa_id}/actividades`, actividad)
        const response = await this.parseResponse(call)
        return response.data
    }

    async update_actividad_general(actividad_id: number, actividad: ActividadFormacionColectivaModel): ActividadFormacionColectivaModel {
        const call = this.callWithToken().put(`actividad-colectiva/${actividad_id}`, actividad)
        const response = await this.parseResponse(call)
        return response.data
    }

    async delete_actividad_general(actividad_id: number) {
        const call = this.callWithToken().delete(`actividad-colectiva/${actividad_id}`)
        const response = await this.parseResponse(call)
    }

    async retrieve_actividad_general(actividad_id: number): ActividadFormacionColectivaModel {
        const call = this.callWithToken().get(`actividad-colectiva/${actividad_id}`)
        const response = await this.parseResponse(call)
        return response.data
    }

    async request_review_actividad_general(actividad_id: number) {
        const call = this.callWithToken().post(`actividad-formacion/${actividad_id}/solicitar-revision`)
        const response = await this.parseResponse(call)
    }
    //ACTIVIDADES AREA
    async all_actividades_especificas(actividad_id: number): ActividadFormacionColectivaModel[] {
        const filter = new Filter(1, 100)
        const call = this.callWithToken().get(`actividad-colectiva/${actividad_id}/actividades-area`, { params: filter })
        const response = await this.parseResponse(call)
        const list = [...response.data.results]

        while (response.next) {
            filter.page++
            const call = this.callWithToken().get(`actividad-colectiva/${actividad_id}/actividades-area`, { params: filter })
            const response = await this.parseResponse(call)
            list.push(...response.data.results)
        }

        return list
    }

    async create_actividad_especifica(actividad_id: number, actividad: ActividadFormacionColectivaModel): ActividadFormacionColectivaModel {
        const call = this.callWithToken().post(`actividad-colectiva/${actividad_id}/actividades-area`, actividad)
        const response = await this.parseResponse(call)
        return response.data
    }

    async update_actividad_especifica(actividad_id: number, actividad: ActividadFormacionColectivaModel): ActividadFormacionColectivaModel {
        const call = this.callWithToken().put(`actividad-area/${actividad_id}/`, actividad)
        const response = await this.parseResponse(call)
        return response.data
    }

    async delete_actividad_especifica(actividad_id: number) {
        const call = this.callWithToken().delete(`actividad-area/${actividad_id}`)
        const response = await this.parseResponse(call)
    }

    async retrieve_actividad_general(actividad_id: number): ActividadFormacionColectivaModel {
        const call = this.callWithToken().get(`actividad-area/${actividad_id}`)
        const response = await this.parseResponse(call)
        return response.data
    }
    //ARCHIVO
    async delete_archivo(archivo_id: number) {
        const call = this.callWithToken().delete(`archivo/${archivo_id}/`)
        const response = await this.parseResponse(call)
    }
    //DIMENSIONES
    async all_dimensiones(): DimensionModel[] {
        const list: DimensionModel[] = []
        const filter = new Filter(1, 100)
        let call = this.callWithToken().get('dimension/')
        let response: PaginateResponse<DimensionModel> = await this.parseResponse(call)
        list.push(...response.data.results)

        while (response.next) {
            filter.page++
            call = this.callWithToken().get('dimension/')
            response = await this.parseResponse(call)
            list.push(...response.data.results)
        }

        return list
    }

}

const FColectivaServices = new FormacionColectivaServices()
export default FColectivaServices
