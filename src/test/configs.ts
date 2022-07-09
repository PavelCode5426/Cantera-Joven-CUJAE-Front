import {ConfigurationModel} from "~/services/models/configuration.model"

const configsResponse = {
  auto_importar_estudiante: {
    id: 1,
    valor: true
  },
  auto_importar_posible_graduado: {
    id: 2,
    valor: true
  },
  auto_importar_graduado: {
    id: 3,
    valor: true
  },
  auto_actualizar_usuario: {
    id: 4,
    valor: true
  },
  enviar_estado_notificaciones: {
    id: 5,
    valor: true
  },
  asd1:{
    id:1,
    valor:'alksdlaksdlasldklaskdlkasldklskdl'
  }
} as Object

const configs :ConfigurationModel[] = []
Object.keys(configsResponse).forEach(i => configs.push(new ConfigurationModel(configsResponse[i].id,i,configsResponse[i].valor)))

export default configs