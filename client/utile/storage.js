
export let setLocalStorage =(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
}
export let getLocalStorage =(key)=>{
    return JSON.parse(localStorage.getItem(key))
}

export let removeLocalStorage =(key)=>{
   localStorage.removeItem(key)
}