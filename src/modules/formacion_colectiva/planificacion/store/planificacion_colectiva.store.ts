import { defineStore } from 'pinia'
import type { EtapaFormacionModel, PlanFormacionColectivaModel} from '~/backed_services/models/formacion_colectiva.model'

export const initialState: PlanFormacionColectivaModel | undefined = undefined

const formacionColectivaStore = defineStore('plan-colectivo', () => {
    const plan = ref<PlanFormacionColectivaModel>(undefined)
    const etapas = ref<EtapaFormacionModel[]>([])

    return { plan, etapas }
})
export default formacionColectivaStore
