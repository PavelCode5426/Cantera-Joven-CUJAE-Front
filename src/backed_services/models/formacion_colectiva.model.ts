import type UserModel from '~/backed_services/models/user.model'
import type { JovenModel } from '~/backed_services/models/joven.model'
import type ArchivoModel from '~/backed_services/models/archivo.model'
import type AreaModel from '~/backed_services/models/area.model'

export enum EstadoPlanFormacion {
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
    estado: EstadoPlanFormacion
}

export class EtapaFormacionModel {
    id: number
    //dimension: number | null // TODO PONER LA DIMENSION EN EL BACKEND
    fechaInicio: string | null
    fechaFin: string | null
    plan: number
}

export class DimensionModel {
    id: number
    nombre: string
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
    esGenera: boolean
    //asistencias:
}
