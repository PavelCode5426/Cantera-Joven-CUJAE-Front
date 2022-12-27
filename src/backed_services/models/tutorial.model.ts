import type UserModel from '~/backed_services/models/user.model'
import type { EstudianteModel, GraduadoModel, JovenModel } from '~/backed_services/models/joven.model'
import type AreaModel from '~/backed_services/models/area.model'

export class AsignacionModel {
  id: number
  fechaAsignado: Date
  fechaRevocado: Date | null
}

export class TutorAsignadoModel extends AsignacionModel {
  tutor: UserModel
}

export class TutoradoAsignadoModel extends AsignacionModel {
  joven: JovenModel | EstudianteModel | GraduadoModel
}

export class SolicitudTutorModel {
  id: number
  joven: JovenModel | EstudianteModel | GraduadoModel
  area: AreaModel
  respuesta: boolean | null
  fechaCreado: string
  fechaRespueste: string | null
}
