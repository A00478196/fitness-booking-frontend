import React from 'react'

const Message = (props) => {
    let {success, error, message, className} = props
  return (
    <p className={`${success?'text-sucess':error?'text-danger':''} ${className}`}>{message}</p>
  )
}

export default Message