import React from 'react'
import Nationality from '../Nationality'
import Header from './Header'

export default function Step1() {
    return (
        <>
            <div className='Container'>
                {/* Header */}
                <Header StepNumber='1' />
                {/* Body */}
                <div className='Note px-5 py-2' style={{ backgroundColor: '#fef7cd' }}>
                    Enter your data exactly as ther appear in your passport/ID to avoid check-in complications.
                    We'll never share your data with anyone.
                </div>
                <div className='Body'>
                    <p>Adult 1</p>
                    <form>
                        <div className="mb-3">
                            <label for="Email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="Email" placeholder='Enter your email' />
                        </div>
                        <div className="mb-3">
                            <label for="Phone-number" class="form-label">Phone Number</label>
                            <input type="number" class="form-control" id="Phone-number" placeholder='Enter your phone number' />
                        </div>
                        <div className="mb-3">
                            <label for="first-name" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="first-name" placeholder='Enter your first name' />
                        </div>
                        <div className="mb-3">
                            <label for="last-name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="last-name" placeholder='Enter your last name' />
                        </div>
                        <div className="mb-3 d-flex">
                            <div className="mr-5">
                                <input type="radio" id="male" name="gender" />
                                <label for="male" className="form-label px-2">Male</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="gender" />
                                <label for="female" className="form-label px-2">Female</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="Date-Of-Birth" className="form-label">Date Of Birth</label>
                            <input type="date" className="form-control" id="Date-Of-Birth" placeholder='Enter your Date Of Birth' />
                        </div>
                        <Nationality />
                        <div className="mb-3">
                            <label for="passport-Number" className="form-label">Passport Number</label>
                            <input type="text" className="form-control" id="passport-Number" placeholder='Enter your Passport Number' />
                        </div>
                        <div className="mb-3">
                            <label for="Expirty-Date" className="form-label">Expirty Date</label>
                            <input type="date" className="form-control" id="Expirty-Date" />
                        </div>
                        <center><button type="submit" className="btn custom-btn">Save and continue</button></center>
                    </form>
                </div>
            </div>
        </>
    )
}
