import {ConfigurationModel} from "~/services/models/configuration.model";

export function convertConfigLabelToTitle(label:string){
    const strs:string[] = label.split('_')
    let str:string = ''
    strs.forEach(i => str = str.concat(` ${i.charAt(0).toUpperCase() + i.slice(1)}`))
    return str
}

export class ConfigHelper {
    public title:string
    public config:ConfigurationModel


    constructor(title: string, config: ConfigurationModel) {
        this.title = title;
        this.config = config;
    }

    public static fromConfigModel(configs:ConfigurationModel[]):ConfigHelper[]{
        const configsResult: ConfigHelper[] = []

        configs.forEach(item => {
            const title = convertConfigLabelToTitle(item.label)
            configsResult.push(new ConfigHelper(title,item))
        })

        return configsResult;
    }
}

export function componentByDataType(value:any){

}