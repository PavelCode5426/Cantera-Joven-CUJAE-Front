import { CallWithToken, ParseResponse, ServerResponse } from '~/globals/config/axios'
import type GraduatedDirectoryModel from '~/services/models/directorio/graduated.directory.model'
import type StudentsDirectoryModel from '~/services/models/directorio/students.directory.model'
import type PossiblyGraduatedDirectoryModel from '~/services/models/directorio/possiblygraduated.directory.model'

export class DirectoryServices {
  // TODO CREAR UNA CLASE ABSTRACTA Y JUNTAR LAS FUNCIONALIDADES
  // GRADUADOS
  public async graduatesWithoutImport() {
    const call = CallWithToken().get('/directorio/graduado')
    const response = await ParseResponse(call)
    if (response instanceof ServerResponse && response.httpCode == 200)
      response.data = response.data as GraduatedDirectoryModel[]

    return response
  }

  public async importGraduates(ids: number[]) {
    const call = CallWithToken().post('/directorio/graduado', {
      importar: ids,
    })
    const response = await ParseResponse(call)
    return response
  }

  // ESTUDIANTES
  public async studentsWithoutImport() {
    const call = CallWithToken().get('/directorio/estudiante')
    const response = await ParseResponse(call)
    if (response instanceof ServerResponse && response.httpCode == 200)
      response.data = response.data as StudentsDirectoryModel[]

    return response
  }

  public async importStudents(ids: number[]) {
    const call = CallWithToken().post('/directorio/estudiante', {
      importar: ids,
    })
    const response = await ParseResponse(call)
    return response
  }

  // POSIBLES GRADUADOS
  public async possiblyGraduatesWithoutImport() {
    const call = CallWithToken().get('/directorio/posible-graduado')
    const response = await ParseResponse(call)
    if (response instanceof ServerResponse && response.httpCode == 200)
      response.data = response.data as PossiblyGraduatedDirectoryModel[]

    return response
  }

  public async importPossiblyGraduate(ids: number[]) {
    const call = CallWithToken().post('/directorio/posible-graduado', {
      importar: ids,
    })
    const response = await ParseResponse(call)
    return response
  }
}

const DirectoryServicesInstance = new DirectoryServices()
export default DirectoryServicesInstance
