import UserModel from '~/backed_services/models/user.model'

export class JovenModel extends UserModel {
  aval: boolean | undefined
  plan: boolean | undefined
}

export class EstudianteModel extends JovenModel {
  anno_academico: number | undefined
}

export class GraduadoModel extends JovenModel {
  esExterno: boolean | undefined
  esNivelSuperior: boolean | undefined
}
