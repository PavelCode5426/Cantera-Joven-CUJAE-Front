import type { ConfigurationModel } from '~/backed_services/models/configuration.model'
import { ActionFlagEnum } from '~/backed_services/models/log.model'
import type { ContentTypeModel } from '~/services/models/logs/contentType.model'

export function convertConfigLabelToTitle(label: string) {
  return label.replaceAll('_', ' ').toLowerCase()
}

export class ConfigHelper {
  public title: string
  public config: ConfigurationModel

  constructor(title: string, config: ConfigurationModel) {
    this.title = title
    this.config = config
  }

  public static fromConfigModel(configs: ConfigurationModel[]): ConfigHelper[] {
    const configsResult: ConfigHelper[] = []
    configs.forEach((item) => {
      const title = convertConfigLabelToTitle(item.etiqueta)
      configsResult.push(new ConfigHelper(title, item))
    })
    return configsResult
  }
}

export function actionFlagToString(flag: ActionFlagEnum) {
  let str = 'Nuevo'
  if (flag == ActionFlagEnum.DELETE)
    str = 'Borrado'
  else if (flag == ActionFlagEnum.EDIT)
    str = 'Modificado'
  return str
}
export function actionFlagToColor(flag: ActionFlagEnum) {
  let str = 'success'
  if (flag == ActionFlagEnum.DELETE)
    str = 'danger'
  else if (flag == ActionFlagEnum.EDIT)
    str = 'info'
  return str
}

// TODO SUSTITUIR ESTO POR UN ARCHIVO DE IDIOMA
export function contentTypeToString(contentType: ContentTypeModel) {
  let str = ''
  switch (contentType.model) {
    case 'notification':
      str = 'Notificacion'
      break
    case 'directoryuser':
      str = 'Usuario de Directorio'
      break
    case 'directoryuserapikey':
      str = 'Credencia de Acceso (APIKEY)'
      break
    case 'alertas':
      str = 'Alertas'
      break
    case 'area':
      str = 'Area'
      break
    case 'lugarprocedencia':
      str = 'Lugar de Procedencia'
      break
    case 'propuestamovimiento':
      str = 'Propuesta de Movimiento'
      break
    case 'dimension':
      str = 'Dimension'
      break
    case 'configuracion':
      str = 'Configuracion'
      break
    case 'estudiante':
      str = 'Estudiante'
      break
    case 'graduado':
      str = 'Graduado'
      break
    case 'posiblegraduado':
      str = 'Posible Graduado'
      break
    case 'aval':
      str = 'Aval'
      break
    case 'evaluacion':
      str = 'Evaluacion'
      break
    case 'plan':
      str = 'Plan'
      break
    case 'etapa':
      str = 'Etapa'
      break
    case 'actividad':
      str = 'Actividad'
      break
    case 'comentario':
      str = 'Comentario'
      break
    case 'entregable':
      str = 'Entregable'
      break
    case 'firmadopor':
      str = 'Firma'
      break
    case 'ubicacionlaboraladelantada':
      str = 'Ubicacion Laboral Adelantada'
      break
    case 'solicitudtutorexterno':
      str = 'Solicitud de Tutor Externo'
      break
    case 'graduadotutor':
      str = 'Asignar Tutor'
      break
    default:
      str = 'Desconocido'
      break
  }

  return str
}
