import React from 'react'

const Message = (props) => {
    let {success, error, message, className} = props
    console.log(success)
  return (
    <p className={`${success ?' text-success ':error?' text-danger':' '} ${className}`}>{message}</p>
  )
}

export default Message