import type AreaModel from '~/backed_services/models/area.model'
import {PosibleGraduadoModel} from "~/backed_services/models/posible_graduado.model";
import UserModel from "~/services/models/user.model";

export default class UbicacionLaboralModel {
    posiblegraduado: PosibleGraduadoModel | undefined
    area: AreaModel | undefined
    esPreubicacion: boolean
    fechaAsignado: string
}

export  class UbicadosAreaModel {
    area: AreaModel
    ubicados: UserModel[]
}

