import {CallWithToken, ServerError, SerializePromese, ServerResponse} from "~/globals/config/axios";
import {ConfigurationModel} from "~/services/models/configuration.model";

export class ConfigurationService {
    public async listConfigs(): ServerResponse | ServerError{
        const call = CallWithToken().get('/config')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
        {
            const configs:ConfigurationModel[] = []
            const responseConfigs = response.data
            responseConfigs.keys(i => {
                configs.push({
                    id:responseConfigs[i].id,
                    label:i,
                    value:responseConfigs[i].valor
                })
            })
            response.data = configs
        }
        return response
    }
}
const configurationServiceInstance = new ConfigurationService()
export default configurationServiceInstance