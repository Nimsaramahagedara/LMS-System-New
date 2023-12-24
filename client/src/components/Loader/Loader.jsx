import React from 'react'
import LoaderAnim from '../../assets/loader.gif'
const Loader = () => {
    return (
        <div className='absolute top-0 left-0 w-full h-full bg-white py-20 transition-all flex items-center justify-center'>
            <div className='w-1/4 aspect-video mx-auto'>
                <img src={LoaderAnim} alt="loading..." className='w-full h-full' />
            </div>
        </div>
    )
}

export default Loader