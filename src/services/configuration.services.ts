import {CallWithToken, ServerError, SerializePromese, ServerResponse} from "~/globals/config/axios";
import {ConfigurationModel} from "~/services/models/configuration.model";

export class ConfigurationService {
    public async listConfigs(): ServerResponse | ServerError{
        const call = CallWithToken().get('/config/')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
        {
            const configs:ConfigurationModel[] = []
            const responseConfigs = response.data
            Object.keys(responseConfigs).forEach(i => configs.push(new ConfigurationModel(responseConfigs[i].id,i,responseConfigs[i].valor)))
            response.data = configs
        }
        return response
    }
    public async updateConfigValue(config:ConfigurationModel): ServerResponse | ServerError{
        const call = CallWithToken().patch(`/config/${config.id}`,{
            llave:config.label,valor:config.value
        })
        const response = await SerializePromese(call)
    }
}
const configurationServiceInstance = new ConfigurationService()
export default configurationServiceInstance