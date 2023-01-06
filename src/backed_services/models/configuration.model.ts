class Validator {
  max?: number
  min?: number
}

export class ConfigurationModel {
  id: number
  etiqueta: string
  valor: any
  validacion: Validator
}
