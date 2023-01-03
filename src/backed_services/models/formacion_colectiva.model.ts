import type UserModel from '~/backed_services/models/user.model'
import type { JovenModel } from '~/backed_services/models/joven.model'
import type ArchivoModel from '~/backed_services/models/archivo.model'
import type AreaModel from '~/backed_services/models/area.model'

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

export class EtapaFormacionModel {
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
    subactividades?: boolean
    documentos?: ArchivoModel[]
    area: AreaModel[]
    esGeneral: boolean
    //asistencias:
}
