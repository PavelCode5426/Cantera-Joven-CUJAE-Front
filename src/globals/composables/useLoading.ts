import {Ref} from "@vue/reactivity";

const loading = ref(false)

export function desactivateLoading(loadingRef:Ref|undefined = undefined,delay:number = 400){
    if (loadingRef == undefined) setTimeout(() => loading.value = false,delay)
    else setTimeout(() => loadingRef.value = false,delay)
}
export function activateLoading(loadingRef:Ref|undefined = undefined,delay:number = 0){
    if (loadingRef == undefined) setTimeout(() => loading.value = true,delay)
    else setTimeout(() => loadingRef.value = true,delay)
}
export function toogleLoading(loadingRef:Ref|undefined = undefined,delay:number = 0){
    const load = loadingRef == undefined? loading : loadingRef
    if (load.value) desactivateLoading(loading,delay)
    else activateLoading(loading,delay)
}

export function toogleLoadingDecorator(func:any,loadingRef:Ref|undefined = undefined,delay:number = 400){
    return async function (){
        activateLoading(loadingRef,0)
        await func()
        desactivateLoading(loadingRef,delay)
    }
}

export default loading

