import {ref} from "vue";
import {Ref} from "@vue/reactivity";

const arrayRef = ref([])

export function clearArrayRefs(array:Ref<Array<any>>|undefined){
    if (array !== undefined)
        array = []
    else
        arrayRef.value = []
}
export function registerArrayRefs(array:Ref<Array<any>>|undefined){
    return (el:any) => {
        if (array !== undefined)
            array.push(el)
        else
            arrayRef.value.push(el)
    }
}
export function newArrayRef(){
    return ref([])
}

export default arrayRef