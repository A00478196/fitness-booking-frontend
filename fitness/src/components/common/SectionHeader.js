import React from 'react'

const SectionHeader = ({label, className}) => {
  return (
    <span className={`section-header ${className} fw-bold fw-9`}>{label}</span>
  )
}

export default SectionHeader