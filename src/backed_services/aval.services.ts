import AbstractService from '~/backed_services/service'
import type { PlantillaAvalModel } from '~/backed_services/models/aval.model'

export interface IPlantillaAvalServices {

}

export class PlantillaAvalServices extends AbstractService implements IPlantillaAvalServices {
  async all_plantillas(): Promise<PlantillaAvalModel[]> {
    const call = this.callWithToken().get('/plantilla-aval/')
    const response = await this.parseResponse(call)
    return response.data
  }

  async get_plantilla(id: number): Promise<PlantillaAvalModel> {
    const call = this.callWithToken().get(`/plantilla-aval/${id}/`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async delete_plantilla(id: number) {
    const call = this.callWithToken().delete(`/plantilla-aval/${id}/`)
    const response = await this.parseResponse(call)
  }

  async create_plantilla(plantilla: PlantillaAvalModel): Promise<PlantillaAvalModel> {
    const call = this.callWithToken().post('/plantilla-aval/', plantilla)
    const response = await this.parseResponse(call)
    return response.data
  }

  async edit_plantilla(id: number, plantilla: PlantillaAvalModel): Promise<PlantillaAvalModel> {
    const call = this.callWithToken().put(`/plantilla-aval/${id}/`, plantilla)
    const response = await this.parseResponse(call)
    return response.data
  }
}

const PlantillaServices = new PlantillaAvalServices()
export default PlantillaServices
