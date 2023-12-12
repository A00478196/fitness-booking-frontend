import React from 'react'

const EmptyMessage = (props) => {
    let {title, className}  = props
  return (
    <p className={`${className} mb-0`}>Sorry, no {title} found</p>
  )
}

export default EmptyMessage