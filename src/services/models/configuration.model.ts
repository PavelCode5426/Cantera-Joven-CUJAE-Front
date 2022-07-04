export class ConfigurationModel {
    id:number
    label:string
    value: any

    constructor(id: number, label: string, value: any) {
        this.id = id;
        this.label = label;
        this.value = value;
    }
}