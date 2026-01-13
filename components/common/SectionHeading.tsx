import React from 'react'

const SectionHeading = ({ subHeading, Heading }: { subHeading: string, Heading: string }) => {
    return (
        <div>
            <span className='gap-3'>
                {/* <p className='text-blue-100 text-sm inline m-5'>{subHeading}</p> */}
                <h2 className='text-2xl font-bold inline'>{Heading}</h2>
            </span>
        </div>
    )
}

export default SectionHeading