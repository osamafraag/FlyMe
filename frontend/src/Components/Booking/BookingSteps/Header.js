import React from 'react'

export default function Header(props) {
    const {StepNumber} = props
    return (
        <div className='stepHeader d-flex align-items-center'>
            <div className='rounded-circle stepHeaderCounter'>
            {StepNumber}
            </div>
            <div className='px-4'>
                <p className='Note py-0 my-0'>Step {StepNumber} of 3</p>
                <p className='py-0 my-0'>Passenger Details</p>
            </div>
        </div>
    )
}
