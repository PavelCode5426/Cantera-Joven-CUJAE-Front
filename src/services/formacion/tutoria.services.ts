import {CallWithToken, SerializePromese, ServerError, ServerResponse} from "~/globals/config/axios";
import UserModel from "~/services/models/user.model";
import GraduatedModel from "~/services/models/graduated.model";
import {TutorRequestModel} from "~/services/models/tutorrequest.model";
import {getRealativeTime} from "~/helpers/utils";

export class TutoriaServices {
    public async listAreaTutors():ServerResponse | ServerError {
        const call = CallWithToken().get("/area/tutores")
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) //TODO SUSTITUIR ESTO POR UN HELPER
            response.data = response.data as UserModel[]
        return response
    }
    public async listAreaGraduates():ServerResponse | ServerError {
        const call = CallWithToken().get("/area/graduados")
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) //TODO SUSTITUIR ESTO POR UN HELPER
            response.data = response.data as GraduatedModel[]
        return response
    }
    public async listAreaGraduatesWithoutAval():ServerResponse | ServerError {
        const call = CallWithToken().get("/area/graduados/sin-aval")
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) //TODO SUSTITUIR ESTO POR UN HELPER
            response.data = response.data as GraduatedModel[]
        return response
    }
    public async listAreaGraduatesWithoutTutor():ServerResponse | ServerError {
        const call = CallWithToken().get("/area/graduados/sin-tutor")
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) //TODO SUSTITUIR ESTO POR UN HELPER
            response.data = response.data as GraduatedModel[]
        return response
    }

    public async listGraduateTutors(id:number):ServerResponse | ServerError {
        const call = CallWithToken().get(`/graduado/${id}/tutores`)
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) //TODO SUSTITUIR ESTO POR UN HELPER
            response.data = response.data as UserModel[]
        return response
    }
    public async assignTutors(id:number,tutors:number[],areas:number[]):ServerResponse | ServerError{
        const call = CallWithToken().post(`/graduado/${id}/asignar-solicitar`,{
            tutores:tutors,areas_solicitadas:areas
        })
        const response = await SerializePromese(call)
        console.log(response)
        return response
    }


    public async listExternalTutorsRequestRecived(){
        const call = CallWithToken().get(`/solicitud-tutor`)
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) { //TODO SUSTITUIR ESTO POR UN HELPER
            response.data = response.data as TutorRequestModel[]
            response.data.forEach(item => item.fechaCreado = getRealativeTime((item.fechaCreado)))
        }
        return response
    }
    public async listExternalTutorsRequestPending(){
        const call = CallWithToken().get(`/solicitud-tutor/pendientes`)
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) { //TODO SUSTITUIR ESTO POR UN HELPER
            response.data = response.data as TutorRequestModel[]
            response.data.forEach(item => item.fechaCreado = getRealativeTime(item.fechaCreado))
        }
        return response
    }
    public async listExternalTutorsRequestSended(){
        const call = CallWithToken().get(`/solicitud-tutor/enviadas`)
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) {//TODO SUSTITUIR ESTO POR UN HELPER
            response.data = response.data as TutorRequestModel[]
            response.data.forEach(item => item.fechaCreado = getRealativeTime(item.fechaCreado))
        }
        return response
    }
}

const tutoriaServicesInstance = new TutoriaServices()
export default tutoriaServicesInstance