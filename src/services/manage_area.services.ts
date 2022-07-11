import {CallWithToken, SerializePromese, ServerResponse} from "~/globals/config/axios";
import {PossiblyGraduatedDirectoryModel} from "~/services/models/directorio/possiblygraduated.directory.model";
import {StudentsDirectoryModel} from "~/services/models/directorio/students.directory.model";

export class ManageAreaServices {

    public async ListarPosibleGraduadoNoPreubicado(){
        const call = CallWithToken().get('/posible-graduado/no-preubicado')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
            response.data = response.data as PossiblyGraduatedDirectoryModel[]
        return response
    }
    public async ListarObtenerPosibleGraduado(id:number){
        const call = CallWithToken().get(`/posible-graduado/${id}/pre-ubicacion`)
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
            response.data = response.data as StudentsDirectoryModel[]
        return response
    }

    public async CrearPreubicacionLaboralAdelantada(){
        const call = CallWithToken().post('/area/preubicacion')
        const response = await SerializePromese(call)
        return response
    }
    public async AceptarRechazarUbicacionLaboralAdelantada(){
        const call = CallWithToken().post('/area/preubicacion/aceptar-rechazar')
        const response = await SerializePromese(call)
        return response
    }
    public async ListarPreubicacionLaboralAdelantada(){
        const call = CallWithToken().get('/area/preubicacion')
        const response = await SerializePromese(call)
        return response
    }

const ManageAreaServicesInstance = new ManageAreaServices()
export default ManageAreaServicesInstance




