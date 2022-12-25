import AbstractService, {Filter} from '~/backed_services/service'
import type {UbicacionLaboralModel } from '~/backed_services/models/ubicacion_laboral.model'
import {PaginateResponse} from "~/globals/config/axios";
import {EstudianteModel, GraduadoModel} from "~/backed_services/models/joven.model";
import {IJovenService, JovenFilter} from "~/backed_services/joven.services";
import {PosibleGraduadoModel} from "~/backed_services/models/posible_graduado.model";
import {PlantillaAvalModel} from "~/backed_services/models/aval.model";

export class PreubicacionFilter extends Filter {
    is_preubicado: boolean | undefined
}

export interface IGestionarAreaServices {

}

export class GestionarAreaServices extends AbstractService implements IGestionarAreaServices {
    async get_pgraduados(filter: PreubicacionFilter | undefined):PaginateResponse<PosibleGraduadoModel[]> {
        const call = this.callWithToken().get(`posible-graduado`,  { params: filter })
        const response = await this.parseResponse(call)
        return response.data
    }

    async all_preubicacionespg(user_id: number, filter: PreubicacionFilter | undefined): PaginateResponse<PosibleGraduadoModel[]> {
        const call = this.callWithToken().get(`posible-graduado/${user_id}/preubicacion-laboral`, { params: filter })
        const response = await this.parseResponse(call)
        return response.data
    }

    async create_ubicacion_laboral(preubicacion: UbicacionLaboralModel){
        const call = this.callWithToken().post(`/preubicacion-laboral/`, preubicacion)
        const response = await this.parseResponse(call)
        return response.data
    }

    async aprobar_ubicacion_laboral(aprobado: false, texto: string){
        const call = this.callWithToken().post(`/preubicacion-laboral/aceptar-rechazar`)
        const response = await this.parseResponse(call)
        return response.data
    }

    async apreubicados_area(area_id: number, filter: PreubicacionFilter | undefined): PaginateResponse<PosibleGraduadoModel[]> {
        const call = this.callWithToken().get(`area/${area_id}/posibles-graduados`, { params: filter })
        const response = await this.parseResponse(call)
        return response.data
    }

}

const gestionarAreaServices = new GestionarAreaServices()
export default gestionarAreaServices
