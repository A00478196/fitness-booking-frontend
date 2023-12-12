import React from 'react'

const Tags = (props) => {
    let {label, className, color} = props
  return (
    <div className={`tags my-3 ${className} ${color && `text-${color}`}`}>{label}</div>
  )
}

export default Tags