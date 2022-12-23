import type { ServerError } from '~/globals/config/axios'
import { CallWithToken, ParseResponse, ServerResponse } from '~/globals/config/axios'
import UserModel from '~/services/models/user.model'
import type StudentModel from '~/services/models/student.model'

export class CanteraServices {
  static listAreaStudentsWithoutAval() {
    throw new Error('Method not implemented.')
  }

  static listAreaStudents() {
    throw new Error('Method not implemented.')
  }

  public async listAreaStudents(): ServerResponse | ServerError {
    const call = CallWithToken().get('/area/estudiantes')
    const response = await ParseResponse(call)
    if (response instanceof ServerResponse && response.httpCode == 200) // TODO SUSTITUIR ESTO POR UN HELPER
      response.data = response.data as StudentModel[]
    return response
  }

  public async listAreaStudentsWithoutAval(): ServerResponse | ServerError {
    const call = CallWithToken().get('/area/estudiantes/sin-aval')
    const response = await ParseResponse(call)
    if (response instanceof ServerResponse && response.httpCode == 200) // TODO SUSTITUIR ESTO POR UN HELPER
      response.data = response.data as StudentModel[]
    return response
  }
}

const canteraServicesInstance = new CanteraServices()
export default canteraServicesInstance

