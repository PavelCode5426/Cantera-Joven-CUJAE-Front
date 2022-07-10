import {CallWithoutToken, CallWithToken, ServerError, SerializePromese, ServerResponse} from '../globals/config/axios'
import AvalModel from "~/services/models/aval.model";
import {DirectoryServices} from "~/services/directory.services";
import {StudentsDirectoryModel} from "~/services/models/directorio/students.directory.model";
import {GraduatedDirectoryModel} from "~/services/models/directorio/graduated.directory.model";

export class AvalService {
    public async createAval(id: number, aval : AvalModel): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().post(`/user/${id}/aval`)
        const response = await SerializePromese(call)
        return response
    }
    public async updateAval(id: number, aval: AvalModel): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().post(`/user/${id}/aval`)
        const response = await SerializePromese(call)
        return response
    }
    
    public async estudianteSinAval(): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().get('/estudiante/sin-aval')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
            response.data = response.data as StudentsDirectoryModel[]
        
        return response
    }

    public async graduadoSinAval(): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().get('/graduado/sin-aval')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
            response.data = response.data as GraduatedDirectoryModel[]

        return response
    }
}


const AvalServiceInstace = new AvalService()
export default AvalServiceInstace
