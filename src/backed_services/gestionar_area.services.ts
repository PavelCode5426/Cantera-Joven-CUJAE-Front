import AbstractService from '~/backed_services/service'
import type {UbicacionLaboralModel } from '~/backed_services/models/ubicacion_laboral.model'

export interface IGestionarAreaServices {

}

export class GestionarAreaServices extends AbstractService implements IGestionarAreaServices {
    async get_pgraduados(): Promise<> {
        const call = this.callWithToken().get('posible-graduado')
        const response = await this.parseResponse(call)
        return response.data
    }

}

const GestionarAreaServices = new GestionarAreaServices()
export default GestionarAreaServices




path('posible-graduado', ListarObtenerPosibleGraduadoListAPIView.as_view()),
    path('posible-graduado/<int:posibleGraduado>/preubicacion-laboral',
        ListarUbicacionesPosibleGraduado.as_view()),

    path('preubicacion-laboral', ListarCrearPreubicacionLaboralAdelantadaAPIView.as_view()),
    path('preubicacion-laboral/aceptar-rechazar',
        AceptarRechazarUbicacionLaboralAdelantadaAPIView.as_view()),

    path('area/<int:areaID>/posibles-graduados', PreubicadosPorAreaListAPIView.as_view()),