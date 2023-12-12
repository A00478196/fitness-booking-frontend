
export const regexForLabels = (name) => {
    if(name){
       return name?.replace(/([a-z])([A-Z])/g, '$1 $2')
    }
}