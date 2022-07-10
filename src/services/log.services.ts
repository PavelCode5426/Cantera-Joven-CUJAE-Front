import {CallWithToken, SerializePromese, ServerResponse} from "~/globals/config/axios";
import {getRealativeTime} from "~/helpers/utils";
import {LogModel} from "~/services/models/log.model";

export class LogServices {
    public async listLogs(){
        const call = CallWithToken().get('usuario/logs')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) {
            response.data = response.data as LogModel[]
            response.data.forEach(i => i.action_time = getRealativeTime(i.action_time))
        }
        return response
    }
}

const logServicesInstance = new LogServices()
export default logServicesInstance

