import {CallWithoutToken, CallWithToken, ServerError, SerializePromese, ServerResponse} from '../globals/config/axios'
import AvalModel from "~/services/models/aval.model";


export class AvalService {
    public async createAval(id: number, aval: aval.model): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().post('/user/${id}/aval')
        const response = await SerializePromese(call)
        return response
    }
    public async estudianteSinAval(): Promise<ServerResponse | ServerError>{
        const call = CallWithToken().get('/estudiante/sin-aval')
        const response = await SerializePromese(call)
        return response
    }
    public async graduadoSinAval(): Promise<ServerResponse | ServerError>{
        const call = CallWithToken().get('/graduado/sin-aval')
        const response = await SerializePromese(call)
        return response
    }


const avalServiceInstace = new AvalService()
export default avalServiceInstace

    export
    default
    class
    avalServices {
}