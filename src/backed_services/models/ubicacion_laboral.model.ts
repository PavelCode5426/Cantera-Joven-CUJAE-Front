import type AreaModel from '~/backed_services/models/area.model'
import {PosibleGraduadoModel} from "~/backed_services/models/posible_graduado.model";

export default class UbicacionLaboralModel {
    posiblegraduado: PosibleGraduadoModel | undefined
    area: AreaModel | undefined
    esPreubicacion: boolean
    fechaAsignado: string
}


