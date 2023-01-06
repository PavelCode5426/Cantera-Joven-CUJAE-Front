import { defineStore } from 'pinia'
import type { DimensionModel, EtapaFormacionModel, PlanFormacionModel } from '~/backed_services/models/formacion_individual.model'

export const initialState: PlanFormacionModel | undefined = undefined

const formacionIndividualStore = defineStore('plan-individual', () => {
  const plan = ref<PlanFormacionModel>(undefined)
  const etapas = ref<EtapaFormacionModel[]>([])
  const dimensiones = ref<DimensionModel[]>([])

  function ultimaEtapa(): EtapaFormacionModel | undefined {
    const steps = [...etapas.value]
    return steps.sort((a, b) => a.numero >= b.numero).pop()
  }

  return { plan, etapas, dimensiones, ultimaEtapa }
})
export default formacionIndividualStore
