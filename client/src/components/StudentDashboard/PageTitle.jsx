import React from 'react'

const PageTitle = ({icon , title , bgColor = 'bg-blue-950'}) => {
    return (
        <div>
            <h1 className={`px-4 py-2  text-white ${bgColor}`}> {icon} {title}</h1>
        </div>
    )
}

export default PageTitle