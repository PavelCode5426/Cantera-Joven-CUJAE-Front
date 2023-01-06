import { defineStore } from 'pinia'

export interface siteModel {
  title: string | undefined
  lastTitle: string | undefined
  isLoading: boolean | undefined
}
const initialState: siteModel = {
  title: 'Cargando...',
  lastTitle: undefined,
  isLoading: true,
}

/**
const siteStore = defineStore('site',{
    state:() => initialState,
    actions: {
        setAttr(data:siteModel) {
            Object.keys(data).forEach(i => this[i] = data[i])
        }
    },
    getters: {
    }
}) */

const siteStore = defineStore('site', () => {
  const title = ref('Cargando...')
  const lastTitle = ref(undefined)
  const isLoading = ref(true)

  return { title, lastTitle, isLoading }
})

export default siteStore
