import React from 'react'

const Button = (props) => {
    let {text, type, className, color, textColor, onClick, onSubmit, disabled} = props
  return (
    <>
    <button onClick={onClick} disabled={disabled} className={`btn px-4 rounded-0  ${className} bg-${color} text-${textColor} ` }>
      {text}
 
</button>
    </>
  )
}

export default Button