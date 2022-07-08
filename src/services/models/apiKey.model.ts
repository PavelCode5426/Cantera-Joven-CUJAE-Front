export default class ApiKeyModel {
    id:number
    name:string
    key:string
    expired_at:string


    constructor(id: number, name: string, key: string, expired_at: string) {
        this.id = id;
        this.name = name;
        this.key = key;
        this.expired_at = expired_at;
    }
}