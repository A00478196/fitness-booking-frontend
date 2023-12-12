
export const regexForLabels = (name) => {
    if(name){
       return name?.replace(/([a-z])([A-Z])/g, '$1 $2')
    }
}

export const loggedUser = localStorage?.getItem("user")
export const userDetail = localStorage?.getItem("userDetails")

export const returnTimeOut = (setMessage) =>{
    return setTimeout(()=>{
        setMessage({
          success:false,
          error:false,
          message:""
        })
      },[6000])
}