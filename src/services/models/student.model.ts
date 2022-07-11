import UserModel from "~/services/models/user.model";

export default class StudentModel extends UserModel {
    anno: number
    aval: undefined | number
}