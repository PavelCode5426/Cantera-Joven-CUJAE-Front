import { CallWithToken, ParseResponse, ServerResponse } from '~/globals/config/axios'
import type { PossiblygraduatedModel } from '~/services/models/possiblygraduated.model'
import { StudentModel } from '~/services/models/student.model'

export class FamiliarizacionServices {
  public async ListarPosibleGraduadoNoPreubicado() {
    const call = CallWithToken().get('/posible-graduado/no-preubicado')
    const response = await ParseResponse(call)
    if (response instanceof ServerResponse && response.httpCode == 200)
      response.data = response.data as PossiblygraduatedModel[]
    return response
  }

  public async ListarObtenerPosibleGraduado(id: number) {
    const call = CallWithToken().get(`/posible-graduado/${id}/pre-ubicacion`)
    const response = await ParseResponse(call)
    if (response instanceof ServerResponse && response.httpCode == 200)
      response.data = response.data as PossiblygraduatedModel[]
    return response
  }

  public async CrearPreubicacionLaboralAdelantada() {
    const call = CallWithToken().post('/area/preubicacion')
    const response = await ParseResponse(call)
    return response
  }

  public async AceptarRechazarUbicacionLaboralAdelantada() {
    const call = CallWithToken().post('/area/preubicacion/aceptar-rechazar')
    const response = await ParseResponse(call)
    return response
  }

  public async ListarPreubicacionLaboralAdelantada() {
    const call = CallWithToken().get('/area/preubicacion')
    const response = await ParseResponse(call)
    return response
  }
}

const FamiliarizacionServicesInstance = new FamiliarizacionServices()
export default FamiliarizacionServicesInstance

