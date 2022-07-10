import AreaModel from "~/services/models/area.model";

export default class UserDirectoryModel {
    id: number
    username: string
    first_name: string
    last_name: string
    email: string
    direccion: string | undefined
}