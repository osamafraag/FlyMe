import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import { AllClasses } from '../../../APIs/AllClasses';
import { useNavigate, useParams } from 'react-router';


export default function Step1() {
    const navigate = useNavigate()
    const userData = useSelector(state => state.loggedInUserSlice.data);

    // handle click on the header to show or not the content of the step
    const [isContentVisible, setIsContentVisible] = useState(true);
    const handleToggle = () => {
        setIsContentVisible(!isContentVisible)
    }

    // Call api Countries + Classes
    const [countries, setCountries] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [classesData, setclassesData] = useState([])
    useEffect(() => {
        const fetchClassOptions = async () => {
            try {
                const data = await AllClasses();
                const classes = data.data.map(classs => classs.name);
                setclassesData(data.data)
                setClassOptions(classes);
            } catch (error) {
                console.error('Error fetching class options:', error);
            }
        };
        fetchClassOptions();
    }, []);

    return (
        <>
            <div className='Container'>
                {/* Header */}
                <div onClick={handleToggle}>
                    <Header StepNumber='1' title='Passenger Data' />
                </div>
                {/* Body */}
                {isContentVisible &&
                    <>
                        <div className='Note px-5 py-2' style={{ backgroundColor: '#fef7cd' }}>
                            <p className='m-0 p-0'>Your data should be exactly as ther appear in your passport/ID to avoid check-in complications.
                                We'll never share your data with anyone.</p>
                            <p className='m-0 p-0 mt-2'>If you want to change your data, click on Edit Profile Data button. If not you can continue your booking process.</p>
                        </div>
                        <div className='Body bg-white'>
                            <div>
                                <p className='fw-bold fs-4'>{userData.first_name} {userData.last_name}</p>
                                <table className="table w-100">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td>{userData.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Phone Number</th>
                                            <td>{userData.phone}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Gender</th>
                                            <td colSpan="2">{
                                                userData.gender == 'F'
                                                    ?
                                                    'Female'
                                                    :
                                                    'Male'
                                            }</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Date Of Birth</th>
                                            <td colSpan="2">{userData.birth_date}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Passport Number</th>
                                            <td colSpan="2">{userData.passport_number}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Passport Expirty Date</th>
                                            <td colSpan="2">{userData.passport_expire_date}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-end'>
                                    <button className='btn custom-btn' onClick={() => navigate('/EditProfile')}> Edit Profile Data </button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div >
        </>
    )
}

