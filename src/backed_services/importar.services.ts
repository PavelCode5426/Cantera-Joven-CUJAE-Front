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

  async import_estudiantes(area_id: number, estudiantes: EstudianteLDAPModel[]) {
    const identifications: string[] = []
    estudiantes.forEach(item => identifications.push(item.identification))
    const call = this.callWithToken().post(`/directorio/${area_id}/estudiante`, { importar: identifications })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_pgraduados(): Promise<UserLDAPModel[]> {
    const call = this.callWithToken().get('/directorio/posible-graduado')
    const response = await this.parseResponse(call)
    return response.data
  }

  async import_pgraduados(pgraduados: UserLDAPModel[]) {
    const identifications: string[] = []
    pgraduados.forEach(item => identifications.push(item.identification))
    const call = this.callWithToken().post('/directorio/posible-graduado', { importar: identifications })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_graduados(): Promise<UserLDAPModel[]> {
    const call = this.callWithToken().get('/directorio/graduado')
    const response = await this.parseResponse(call)
    return response.data
  }

  async import_graduados(graduados: UserLDAPModel[]) {
    const identifications: string[] = []
    graduados.forEach(item => identifications.push(item.identification))
    const call = this.callWithToken().post('/directorio/graduado', { importar: identifications })
    const response = await this.parseResponse(call)
    return response.data
  }

  async all_tutores(area_id: number): Promise<UserLDAPModel[]> {
    const call = this.callWithToken().get(`/directorio/${area_id}/tutor`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async import_tutores(area_id: number, tutores: UserLDAPModel[]) {
    const identifications: string[] = []
    tutores.forEach(item => identifications.push(item.identification))
    const call = this.callWithToken().post(`/directorio/${area_id}/tutor`, { importar: identifications })
    const response = await this.parseResponse(call)
    return response.data
  }
}

const ImportService = new ImportarServices()
export default ImportService
