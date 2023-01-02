import type UserModel from '~/backed_services/models/user.model'
import type { JovenModel } from '~/backed_services/models/joven.model'
import type ArchivoModel from '~/backed_services/models/archivo.model'

export enum EstadoPlanFormacion {
  desarrollo = 'En Desarrollo',
  pendiente = 'Pendiente de Revision',
  aprobado = 'Aprobado',
  rechazado = 'Rechazado',
}
export enum EstadoActividadFormacion {
  desarrollo = 'En Desarrollo',
  pendiente = 'Espera de Revision',
  revisada = 'Revisada',
  parcialmente = 'Parcialmente Cumplida',
  cumplida = 'Cumplida',
  incumplida = 'Incumplida',
}

export class PlanFormacionModel {
  id: number
  aprobadoPor: UserModel | null
  joven: JovenModel | undefined
  documento: string | null
  fechaCreado: string
  estado: EstadoPlanFormacion
  evaluacion: null // TODO PONER LA EVALUACION
  evaluacion_prorroga: null
}

export class EtapaFormacionModel {
  id: number
  numero: number
  esProrroga: boolean
  dimension: number | null // TODO PONER LA DIMENSION EN EL BACKEND
  evaluacion: number | number // TODO PONER LA EVALUACION EN EL BACKEND
  fechaInicio: string | null
  fechaFin: string | null
  objetivo: string | null
  plan: number
}

export class DimensionModel {
  id: number
  nombre: string
}

export class ActividadFormacionModel {
  id: number
  nombre: string
  descripcion: string
  observacion: string
  responsable: string
  participantes: string
  fechaInicio: string
  fechaFin: string
  fechaCumplimiento?: string
  estado?: EstadoActividadFormacion
  subactividades: boolean
  documentos?: ArchivoModel[]
}
