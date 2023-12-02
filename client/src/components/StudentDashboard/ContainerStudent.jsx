import React from 'react'

const ContainerStudent = ({children}) => {
  return (
    <div className='px-4 py-10 bg-gray-50 space-y-3'>
        {children}
    </div>
  )
}

export default ContainerStudent