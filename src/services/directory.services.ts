import {CallWithToken, SerializePromese, ServerResponse} from "~/globals/config/axios";
import {GraduatedDirectoryModel} from "~/services/models/directorio/graduatedirectory.model";
import {StudentsDirectoryModel} from "~/services/models/directorio/students.directory.model";

export class DirectoryServices {
    //GRADUADOS
    public async graduatesWithoutImport(){
        const call = CallWithToken().get('/directorio/graduado')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
            response.data = response.data as GraduatedDirectoryModel[]

        return response
    }
    public async importGraduates(ids:number[]){
        const call = CallWithToken().post('/directorio/graduado',{
            importar:ids
        })
        const response = await SerializePromese(call)
        return response
    }

    //ESTUDIANTES
    public async studentsWithoutImport(){
        const call = CallWithToken().get('/directorio/estudiante')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
            response.data = response.data as StudentsDirectoryModel[]

        return response
    }
    public async importStudents(ids:number[]){
        const call = CallWithToken().post('/directorio/estudiante',{
            importar:ids
        })
        const response = await SerializePromese(call)
        return response
    }
    //POSIBLES GRADUADOS
    public async possiblyGraduatesWithoutImport(){
        const call = CallWithToken().get(´/directorio/posible-graduado´)
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200)
            response.data = response.data as StudentsDirectoryModel[]

        return response
    }
    public async importPossiblyGraduate(ids:number[]){
        const call = CallWithToken().post('/directorio/posible-graduado',{
            importar:ids
        })
        const response = await SerializePromese(call)
        return response
    }
}

const DirectoryServicesInstance = new DirectoryServices()
export default DirectoryServicesInstance