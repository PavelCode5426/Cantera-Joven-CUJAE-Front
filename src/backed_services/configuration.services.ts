import AbstractService from '~/backed_services/service'
import type { ConfigurationModel } from '~/backed_services/models/configuration.model'

export interface IConfigurationService {
}

export class ConfigurationService extends AbstractService implements IConfigurationService {
  async all_configs(): Promise<ConfigurationModel[]> {
    const call = this.callWithToken().get('/config/')
    const response = await this.parseResponse(call)
    return response.data as ConfigurationModel[]
  }

  async update_variable(id: number, config: ConfigurationModel): void {
    const call = this.callWithToken().patch(`config/${id}`, { ...config })
    const response = await this.parseResponse(call)
  }
}

const ConfigService = new ConfigurationService()
export default ConfigService
