import React from 'react'

const ThirdSection = () => {
    return (
        <div className='bg-gray-200 px-0 md:px-5 flex flex-col items-center justify-between md:py-40 py-10 space-y-5' >
            <div className='md:px-20 px-5 md:mb-0 mb-4 py-10 w-5/6 md:w-full border border-2 border-blue-900 rounded-xl' id='vision'>
                <h5>Vision</h5>
                <br />
                <h1 className='text-blue-950 font-bold text-2xl text-center'>Produce citizens cultured by the Anagarika Dharmapala Philosophy comprising of a set of exclusive competencies towards knowledge society.
                </h1>
            </div>
            <div className='md:px-20 px-5 md:w-full py-10 w-5/6 border border-2 border-blue-900 rounded-xl' id='mission'>
                <h5>Mission</h5>
                <br />
                <p className='text-blue-950 font-bold text-2xl text-center'>Develop students processing competencies essential for the future world of work, determining high quality standards of human resources, thus empowering the community, the parents, teachers and managers.</p>
            </div>
        </div>
    )
}

export default ThirdSection