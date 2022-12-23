import { CallWithToken, CallWithoutToken, ExceptionResponse, Response, ServerError, ServerResponse } from '~/globals/config/axios'
import { isExceptionResponse, isServerError } from '~/helpers/utils'

export default class AbstractService {
  callWithToken() {
    return CallWithToken()
  }

  callWithoutToken() {
    return CallWithoutToken()
  }

  async parseResponse(promesa): Promise<Response> {
    let api_response: Response
    await promesa.then((response: any) => {
      api_response = new ServerResponse(response.status, response.data)
    }).catch((error: any) => {
      api_response = this.manageResponseError(error)
    })
    return api_response
  }

  protected manageResponseError(error): ServerError | ExceptionResponse {
    let response
    if (!error.response) { // INDICA QUE ES UN ERROR DEL SERVIDOR
      response = new ServerError(error.status, error.toJSON())
      response = this.handleServerError(new ServerError(error.status, error.toJSON()))
    }
    else { // ES UNA EXCEPCION DEL BACKEND
      error = error.response
      response = new ExceptionResponse(error.status, error.data)
      response = this.handleExceptionResponse(response)
    }
    if (response instanceof Response)
      throw response
  }

  protected handleServerError(error: ServerError): ServerError | boolean {
    return error
  }

  protected handleExceptionResponse(response: ExceptionResponse): ExceptionResponse | boolean {
    return response
  }
}