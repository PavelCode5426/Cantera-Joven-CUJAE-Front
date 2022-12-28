import { InternalModuleFormat } from 'rollup'
import AbstractService from '~/backed_services/service'

export interface IFormacionIndividualServices {

}

export class FormacionIndividualServices extends AbstractService implements IFormacionIndividualServices {
}

const FIndivServices = new FormacionIndividualServices()
export default FIndivServices
