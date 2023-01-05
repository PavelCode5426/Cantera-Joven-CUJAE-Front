import type UserModel from '~/backed_services/models/user.model'
import type { JovenModel } from '~/backed_services/models/joven.model'
import type ArchivoModel from '~/backed_services/models/archivo.model'

export enum EstadoPlanFormacion {
  desarrollo = 'En Desarrollo',
  pendiente = 'Pendiente de Revision',
  aprobado = 'Aprobado',
  finalizado = 'Finalizado',
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
  evaluacion: EvaluacionFinalModel | null // TODO PONER LA EVALUACION
  evaluacion_prorroga: null
}

export class EtapaFormacionModel {
  id: number
  numero: number
  esProrroga: boolean
  dimension: DimensionModel | null// TODO PONER LA DIMENSION EN EL BACKEND
  evaluacion: EvaluacionFormacionModel | null // TODO PONER LA EVALUACION EN EL BACKEND
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
  estapa: number
  nombre: string
  descripcion: string
  observacion: string
  responsable: string
  participantes: string
  fechaInicio: string
  fechaFin: string
  fechaCumplimiento?: string
  estado?: EstadoActividadFormacion
  esSubactividad: boolean
  // hasSubactividades: boolean
  // subactividades?: ActividadFormacionModel[] = []
  children?: ActividadFormacionModel[] = []
  documentos?: ArchivoModel[]
}

export class PropuestaMovimientoModel {
  id: number
  nombre: string
}

export abstract class EvaluacionModel {
  id: number
  texto: string
  esSatisfactorio: boolean
  aprobadoPor: UserModel
  fechaCreado: string

  joven?: JovenModel
  etapa?: EtapaFormacionModel
  plan?: PlanFormacionModel
}

export class EvaluacionFormacionModel extends EvaluacionModel {
  replanificar = false
  cerrarPlan = false
}

export class EvaluacionFinalModel extends EvaluacionModel {
  propuestaMovimiento: number | PropuestaMovimientoModel
}
