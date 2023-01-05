import type UserModel from '~/backed_services/models/user.model'
import type { JovenModel } from '~/backed_services/models/joven.model'
import type ArchivoModel from '~/backed_services/models/archivo.model'
import type AreaModel from '~/backed_services/models/area.model'
import {PosibleGraduadoModel} from "~/backed_services/models/posible_graduado.model";
import {
    EstadoActividadFormacion,
    EtapaFormacionModel,
    PlanFormacionModel
} from "~/backed_services/models/formacion_individual.model";

export enum EstadoPlanFormacionColectiva {
    desarrollo = 'En Desarrollo',
    pendiente = 'Pendiente de Revision',
    aprobado = 'Aprobado',
    rechazado = 'Rechazado',
}

export class PlanFormacionColectivaModel {
    id: number
    aprobadoPor: UserModel | null
    documento: string | null
    fechaCreado: string
    estado: EstadoPlanFormacionColectiva
}

export class EtapaFormacionColectivaModel {
    id: number
    fechaInicio: string | null
    fechaFin: string | null
    plan: number
}

export class ActividadFormacionColectivaModel {
    id: number
    nombre: string
    descripcion: string
    observacion: string
    responsable: string
    participantes: string
    fechaInicio: string
    fechaFin: string
    documentos?: ArchivoModel[]
    area: AreaModel
    esEspecifica: boolean
    actividades_especificas?: ActividadFormacionColectivaModel[] = []
    asistencias: PosibleGraduadoModel[]
}

export abstract class EvaluacionColectivaModel {
    id: number
    texto: string
    esSatisfactorio: boolean
    aprobadoPor: UserModel
    fechaCreado: string

    joven?: JovenModel
}
