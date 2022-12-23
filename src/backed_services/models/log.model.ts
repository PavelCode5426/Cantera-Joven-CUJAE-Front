class ContentType {
  id: number
  app_label: string
  model: string
}

export default class LogModel {
  id: number
  action_time: string
  object_id: number
  object_repr: string
  action_flag: number
  change_message: string
  content_type: ContentType
}
