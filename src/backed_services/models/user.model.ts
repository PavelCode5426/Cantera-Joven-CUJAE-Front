import type AreaModel from '~/backed_services/models/area.model'

export default class UserModel {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  direccion: string | undefined
  cargo: string | undefined
  telefono: string | undefined
  carnet: string
  directorioID: string
  area: AreaModel | undefined
}
export class AuthUserModel extends UserModel {
  groups: RoleModel[] | undefined
}
