import AbstractService from '~/backed_services/service'
import type { EstudianteLDAPModel, UserLDAPModel } from '~/backed_services/models/ldap.model'

export interface IImportarServices {

}

export class ImportarServices extends AbstractService implements IImportarServices {
  async all_estudiantes(area_id: number): Promise<EstudianteLDAPModel[]> {
    const call = this.callWithToken().get(`/directorio/${area_id}/estudiante`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_pgraduados(): Promise<UserLDAPModel[]> {
    const call = this.callWithToken().get('/directorio/posible-graduado/')
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_graduados(): Promise<UserLDAPModel[]> {
    const call = this.callWithToken().get('/directorio/graduado/')
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_tutores(area_id: number): Promise<UserLDAPModel[]> {
    const call = this.callWithToken().get(`/directorio/${area_id}/tutor`)
    const response = await this.parseResponse(call)
    return response.data
  }
}

const ImportService = new ImportarServices()
export default ImportService
