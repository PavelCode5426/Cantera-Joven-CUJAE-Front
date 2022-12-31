import { defineStore } from 'pinia'
import type { DimensionModel, EtapaFormacionModel, PlanFormacionModel } from '~/backed_services/models/formacion_individual.model'

export const initialState: PlanFormacionModel | undefined = undefined

const formacionIndividualStore = defineStore('plan-individual', () => {
  const plan = ref<PlanFormacionModel>(undefined)
  const etapas = ref<EtapaFormacionModel[]>([])
  const dimensiones = ref<DimensionModel[]>([])

  return { plan, etapas, dimensiones }
})
export default formacionIndividualStore
