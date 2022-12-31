import UserModel from '~/backed_services/models/user.model'
import type { PlanFormacionModel } from '~/backed_services/models/formacion_individual.model'

export class JovenModel extends UserModel {
  aval: boolean | undefined
  plan: null | PlanFormacionModel
}

export class EstudianteModel extends JovenModel {
  anno_academico: number | undefined
}

export class GraduadoModel extends JovenModel {
  esExterno: boolean | undefined
  esNivelSuperior: boolean | undefined
}
