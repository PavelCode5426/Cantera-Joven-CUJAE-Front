import UserModel from "~/services/models/user.model";

export default class GraduatedModel extends UserModel {
    esExterno:boolean
    esNivelSuperior:boolean
    aval: undefined | number
}