import type UserModel from '~/backed_services/models/user.model'
import type { EvaluacionColectivaModel } from '~/backed_services/models/formacion_colectiva.model'

export class PosibleGraduadoModel extends UserModel {
    evaluacion_fam: EvaluacionColectivaModel
}
