import {ActionFlagEnum} from "~/services/models/logs/actionFlag.model";
import {ContentTypeModel} from "~/services/models/logs/contentType.model";

export class LogModel {
    "id": number
    "action_time": string
    "object_id": number
    "object_repr": string
    "action_flag": ActionFlagEnum
    "change_message": string
    "content_type": ContentTypeModel
}