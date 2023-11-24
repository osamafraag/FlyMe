import React from 'react'

export default function Header(props) {
    const {StepNumber, title} = props
    return (
        <div className='stepHeader d-flex align-items-center'>
            <div className='rounded-circle stepHeaderCounter'>
            {StepNumber}
            </div>
            <div className='px-4'>
                <div>
                    <p className='Note py-0 my-0'>Step {StepNumber} of 2</p>
                </div>
                <p className='py-0 my-0'>{title}</p>
            </div>
        </div>
    )
}
