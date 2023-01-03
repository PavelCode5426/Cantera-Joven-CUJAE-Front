import AbstractService, {Filter} from '~/backed_services/service'
import type {UbicacionLaboralModel } from '~/backed_services/models/ubicacion_laboral.model'
import {PaginateResponse} from "~/globals/config/axios";
import {EstudianteModel, GraduadoModel} from "~/backed_services/models/joven.model";
import {IJovenService, JovenFilter} from "~/backed_services/joven.services";
import {PosibleGraduadoModel} from "~/backed_services/models/posible_graduado.model";
import {PlantillaAvalModel} from "~/backed_services/models/aval.model";
import {SolicitudTutorExterno, TutoriaFilter} from "~/backed_services/tutoria.services";
import {TutorAsignadoModel} from "~/backed_services/models/tutorial.model";
import {UbicadosAreaModel} from "~/backed_services/models/ubicacion_laboral.model";

export class PreubicacionFilter extends Filter {
    is_preubicado: boolean | undefined
}

export class AprobarPreubicacionArea {
    mensaje: string
    aceptada: boolean

    constructor(mensaje: string, aceptada: boolean) {
        this.mensaje = mensaje
        this.aceptada = aceptada
    }
}

export interface IGestionarAreaServices {

}

export class GestionarAreaServices extends AbstractService implements IGestionarAreaServices {
    async get_pgraduados(filter: PreubicacionFilter | undefined): PaginateResponse<PosibleGraduadoModel> {
        const call = this.callWithToken().get(`posible-graduado`, { params: filter })
        const response = await this.parseResponse(call)
        return response.data
    }

    async all_preubicacionespg(id: number, filter: Filter): PaginateResponse<UbicacionLaboralModel> {
        const call = this.callWithToken().get(`posible-graduado/${id}/preubicacion-laboral`, { params: filter })
        const response = await this.parseResponse(call)
        return response.data  //historial de ubicaciones del posible graduado , preubicacion laboral adelantada serializer, posible graduado, lista de ubicaciones
    }

    async create_ubicacion_laboral(preubicacion: UbicadosAreaModell){
        const call = this.callWithToken().post(`/preubicacion-laboral/`, preubicacion)
        const response = await this.parseResponse(call)
        return response.data
    }

    async get_ubicacion_laboral(){
        const call = this.callWithToken().get(`/preubicacion-laboral`)
        const response = await this.parseResponse(call)
        return response.data //cuando están pendientes a aprobar x el vicerrector
    }

    async aprobar_ubicacion_laboral(aprobar: AprobarPreubicacionArea){
        const call = this.callWithToken().post(`/preubicacion-laboral/aceptar-rechazar`, aprobar)
        const response = await this.parseResponse(call)
        return response.data //Si acepta la preubicacion se pone en TRUE, mientras la preubicacion en preubicaciones sea False
    }

    async preubicados_area(id: number, filter: Filter): PaginateResponse<PosibleGraduadoModel> {
        const call = this.callWithToken().get(`area/${id}/posibles-graduados`, { params: filter })
        const response = await this.parseResponse(call)
        return response.data //posibles graduados por area
        //muestra los ya preubicados en el area
    }

}

const gestionarAreaServices = new GestionarAreaServices()
export default gestionarAreaServices
