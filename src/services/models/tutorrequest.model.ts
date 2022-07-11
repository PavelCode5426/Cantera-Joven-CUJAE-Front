import GraduatedModel from "~/services/models/graduated.model";

export class TutorRequestModel {
    id:number
    area:string
    graduado: GraduatedModel
    respuesta: boolean | undefined
    fechaCreado:string
    fechaRespuesta: string


    constructor(id: number, area: string, graduado: GraduatedModel, respuesta: boolean | undefined, fechaCreado: string, fechaRespuesta: string) {
        this.id = id;
        this.area = area;
        this.graduado = graduado;
        this.respuesta = respuesta;
        this.fechaCreado = fechaCreado;
        this.fechaRespuesta = fechaRespuesta;
    }
}