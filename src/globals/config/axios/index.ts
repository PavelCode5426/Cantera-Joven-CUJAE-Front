import axios, {Axios} from "axios"

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

const axiosWithToken = {...axios.create({
    baseURL: SERVER_URL,
    headers
  })}
const axiosWithOutToken = axios.create({
  baseURL: SERVER_URL,
  headers
})

export function CallWithToken(): Axios {
  const token = JSON.parse(localStorage.getItem("auth")).token
  const headers_token = Object.create(headers)
  headers_token.common["Authorization"]=`Bearer ${token}`
  axiosWithToken.defaults.headers = headers_token
  return axiosWithToken
}
export function CallWithoutToken(): Axios {
  return axiosWithOutToken
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
