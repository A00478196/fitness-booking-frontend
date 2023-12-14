
export const regexForLabels = (name) => {
    if(name){
       return name?.replace(/([a-z])([A-Z])/g, '$1 $2')
    }
}

export const loggedUser = localStorage?.getItem("user")
export const userDetail = localStorage?.getItem("userDetails")

export const returnTimeOut = (setMessage) =>{
    return setMessage({
        success:false,
        error:false,
        message:""
      })
    // return setTimeout(()=>{
        
    //   },[6000])
}

export const validateForm = (data, setFormErrors)=>{
  let errors={}
  if(data){
      Object.keys(data)?.map((formD)=>{
          let key = formD
          let val = data[formD]
          if(val!==undefined ){
              if( val=="" ){
                  errors[key] = `${formD} is required`
              }
          }else{
              errors[key] = `${formD} is required`
          }
      })

    }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
}

export const generalForm = (data, setFormErrors)=>{
  const errors = {};
  if(data){
      Object.keys(data)?.map((formD)=>{
          let key = formD
          let val = data[formD]

          if(val!==undefined ){
              if( val=="" ){
                  errors[key] = `${formD} is required`
              }
          }else{
              errors[key] = `${formD} is required`
          }
      })
  }
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
}