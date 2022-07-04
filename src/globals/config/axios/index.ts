import axios, {AxiosInstance} from "axios"

const SERVER_URL = import.meta.env.VITE_URL_SERVER
export class ServerResponse {
  public httpCode:number
  public data:any

  constructor(httpCode: number, data: any) {
    this.httpCode = httpCode;
    this.data = data;
  }
}
export class ServerError {
  error:any
  constructor(error: any) {
    this.error = error;
  }
}

const headers = axios.defaults.headers
// headers.common["Access-Control-Allow-Origin"] = "*"
// headers.common["Content-Type"] = "application/json"
// headers.common["Access-Control-Request-Method"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS"
// headers.common["Access-Control-Allow-Headers"] = "*"

export function CallWithToken(): AxiosInstance {
  const token = JSON.parse(localStorage.getItem("auth")).token
  const headers_token = Object.create(headers)
  headers_token.common["Authorization"]=`Bearer ${token}`

  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers:headers_token,
  })
  return axiosInstance
}
export function CallWithoutToken(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers
  })
  return axiosInstance
}

export function SerializeResponse(httpCode: number, data: any): ServerResponse {
  return new ServerResponse(httpCode,data)
}
export async function SerializePromese(promesa): ServerResponse | ServerError {
  let api_response:ServerResponse | ServerError
  await promesa.then((response:any) => {
    api_response = SerializeResponse(response.status, response.data)
  }).catch((error:any) => {
    if (!error.response)
      api_response = new ServerError(error.toJSON())
    else {
      error = error.response
      api_response = SerializeResponse(error.status, error.data)
    }
  })
  return api_response
}
