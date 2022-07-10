import HasAreaDirectoryInterface from "~/services/models/directorio/hasArea.directory.interface";
import UserDirectoryModel from "~/services/models/directorio/user.directory.model";

export default class GraduatedDirectoryModel extends UserDirectoryModel implements HasAreaDirectoryInterface{
    esExterno:boolean
    esNivelSuperior:boolean
}