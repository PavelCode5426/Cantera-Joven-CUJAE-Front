import {CallWithToken, SerializePromese, ServerError, ServerResponse} from "~/globals/config/axios";
import UserModel from "~/services/models/user.model";
import GraduatedModel from "~/services/models/graduated.model";

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
}

const tutoriaServicesInstance = new TutoriaServices()
export default tutoriaServicesInstance