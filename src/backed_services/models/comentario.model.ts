import type UserModel from '~/backed_services/models/user.model'

export default class ComentarioModel {
  id: number
  texto: string
  usuario: UserModel
  fecha: string
}
